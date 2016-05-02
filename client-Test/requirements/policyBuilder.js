'use strict'

var harmony = require('harmony-reflect');
var Reflect = require('./reflect.js');
var helper = require('./helper.js');
var _ = require('lodash');

function isEmpty(obj) {
    for (var x in obj) { if (obj.hasOwnProperty(x))  return false; }
        return true;
}

var defaultStateMethodArg =  {
    filter: function(target,name,args,recv,condition){
        if ( typeof condition == "undefined" ||args[0] == condition[0]){ 
            return false;
        }else{
            return true;
        }
    }
}

var defaultWhiteList = {
    filter: function(target,name,args,recv,whiteList){
        if(helper.contains(whitelist,name)){
            return false;
        }else{
            return true;
        }
    }
}


function cleanState(inputState,defaultState){
    if (isEmpty(inputState)){
        return defaultState;
    }else{
        return inputState;
    }
}

function getAllProp(list){
    var val = [];
    list.forEach( function(el){
        Object.keys(el).forEach(function (key) {
            val.push(el[key]);
        });
    })
    return val;
}

function getAllPropWithKey(list,keyword){
    var val = [];
    list.forEach( function(el){
        Object.keys(el).forEach(function (key) {
            if(key == keyword){
                val.push(el[key]);
            }
            
        });
    })
    return val;
}


function policy(inputState){
    this.state = inputState; 
    this.deny = function(denyObjectList){
        if (denyObjectList.constructor == Array){
            var denyObject = denyObjectList;
        }else{
            var denyObject = []
            denyObject.push(denyObjectList);
        }
        var state = this.state;          
        var err = new Error( 'is not allowed by the proxy' );
        if (denyObject[0].hasOwnProperty('method')) {
            this.handler = {
                get:function(target,name,recv){
                    console.log("get: " + name);
                    var method = Reflect.get(target, name, recv);
                    var properties = getAllProp(denyObject);
                    if (helper.contains(properties,name)){
                        return function (... args) {
                            this.state = cleanState(state,defaultStateMethodArg);                                   
                            var correctObject = denyObject.find(function(el){
                                return el.method === name
                            })
                            if (this.state.filter(target,name,args,recv,correctObject['arguments'])){
                                return target[name].apply(target,args);
                            }else{
                                throw err;
                            }
                        }
                    }
                    else{
                        return method;
                    }
                }
            } 
        }else if(denyObject[0].hasOwnProperty('propertyUpdate')){
            var state = this.state;
            this.handler = {
                set:function(target,name,value,recv){
                    console.log("set: " +name);
                    var properties = getAllProp(denyObject);
                    if (helper.contains(properties,name)){
                                this.state = cleanState(state,defaultStateMethodArg); // moet state blijven anders kan whitelist het niet overschrijven
                                if (this.state.filter(target,name,value,recv)){
                                    Reflect.set(target,name,value,recv);
                                }else{
                                    throw err;
                                }
                            }
                            Reflect.set(target,name,value,recv);
                        }
                    }
                }else if (denyObject[0].hasOwnProperty('propertyRead')){
                    var state = this.state;
                    this.handler = {
                        get:function(target,name,recv){
                            var properties = getAllProp(denyObject);
                            if (helper.contains(properties,name)){
                                this.state = cleanState(state,defaultStateMethodArg);
                                if(this.state.filter(target,name,[],recv)){
                                    Reflect.get(target,name,recv);
                                }else{
                                    throw err;
                                }
                            }
                        }
                    }
                } else if (denyObject[0].hasOwnProperty('propertyFull')){
                    var state = this.state;
                    this.handler = {
                        get : function(target,name,recv){
                            var properties = getAllProp(denyObject);
                            if(helper.contains(properties,name)){
                                this.state = cleanState(state,defaultStateMethodArg);
                                if(this.state.filter(target,name,[],recv)){
                                    Reflect.get(target,name,recv);
                                }else{
                                    throw err;
                                }
                            }
                        },
                        set:function(target,name,value,recv){
                            console.log("set: " +name);
                            var properties = getAllProp(denyObject);
                            if (helper.contains(properties,name)){
                                this.state = cleanState(state,defaultStateMethodArg); // moet state blijven anders kan whitelist het niet overschrijven
                                if (this.state.filter(target,name,value,recv)){
                                    Reflect.set(target,name,value,recv);
                                }else{
                                    throw err;
                                }
                            }
                            Reflect.set(target,name,value,recv);
                        }

                    }
                }
                return this;
            }
            
            this.whiteList = function(allowedList){
                this.state = { 
                    filter : function(target,name,value,receiver){
                        if (value.constructor == Object){
                            var val = []
                            Object.keys(value).forEach(function (key) {
                                val.push(value[key]);
                            });
                            return helper.containsMultiList(allowedList,val)
                        }
                        return helper.contains(allowedList,value)
                    }
                }
                return this;
            }

            this.whiteListEqual = function(allowedList, equalityFunc){
                this.state = {
                    filter : function(target,name,value,receiver){
                        if (value.constructor == Object){
                            var val = []
                            Object.keys(value).forEach(function (key) {
                                val = value[key];
                            });
                            return equalityFunc(name,val,allowedList);
                        }
                        return equalityFunc(name,value,allowedList);
                    }
                }
                return this;
            }

            this.install = function(target){
                return new Proxy(target,this.handler);
            }

            this.allow = function(allowObjectList){
                    var state = this.state;          // moet state blijven anders kan whitelist het niet overschrijven
                    var err = new Error( 'is not allowed by the proxy' );
                    if (allowObjectList.constructor == Array){
                        var allowObject = allowObjectList;
                    }else{
                        var allowObject = []
                        allowObject.push(allowObjectList);
                    }
                    if (allowObject[0].hasOwnProperty('method')) {
                        var sigList = convertObjectToSignatureList(allowObject,'method')
                        this.handler = {
                            get:function(target,name,recv){
                                console.log("get: " +name)
                                var funcList = Object.getOwnPropertyNames(target);
                                if (helper.contains(funcList,name)){ // check if function is from object not the prototype
                                    var properties = getAllPropWithKey(allowObject,'method');
                                    if(helper.contains(properties,name) || helper.contains(getExonerateList(sigList),name)){
                                        updateList(sigList,name);
                                        return Reflect.get(target,name,recv);
                                    }else{
                                        throw err;
                                    }   
                                }else{
                                    return Reflect.get(target,name,recv);
                                }
                            }
                        }
                    }else if (allowObject[0].hasOwnProperty('propertyRead')) {
                        this.handler= {
                            get:function(target,name,recv){
                                var properties = getAllPropWithKey(allowObject,'propertyRead');
                                if(helper.contains(properties,name)){   
                                    return Reflect.get(target,name,recv);
                                }else{
                                    throw err;
                                }   
                            },
                            set:function(target,name,value,recv){
                                throw err;
                            }
                        }
                    }else if (allowObject[0].hasOwnProperty('propertyUpdate')){
                        this.handler = {
                            get: function(target, name, recv){
                                throw err;
                            },
                            set: function(target, name , value, recv){
                                var properties = getAllPropWithKey(allowObject,'propertyUpdate');
                                if(helper.contains(properties,name)){   
                                    return Reflect.set(target,name,value,recv);
                                }else{
                                    throw err;
                                }   
                            }
                        }

                    } else{
                        this.handler = {
                            get: function (target, name, recv){
                                var properties = getAllPropWithKey(allowObject,'propertyFull');
                                if(helper.contains(properties,name)){   
                                    return Reflect.get(target,name,recv);
                                }else{
                                    throw err;
                                }   
                            },
                            set: function (target,name,value, recv){
                                var properties = getAllPropWithKey(allowObject,'propertyFull');
                                if(helper.contains(properties,name)){   
                                    return Reflect.set(target,name,value,recv);
                                }else{
                                    throw err;
                                }   
                            }
                        }
                    }
                    return this;
                }

                this.installOnMultipleTargets = function(listOfTargets){
                    var listOfProxy = [];
                    for (var i = 0;i < listOfTargets.length;i++){
                        var temp = new Proxy(listOfTargets[i],this.handler); 
                        listOfProxy.push(temp);
                    }
                    return listOfProxy;
                }
            }



if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

function convertListToObjects(list){
    var result = [];
    list.forEach(function(el){
        var obj = [];
        obj = [el,0]
        result.push(obj);
    })
    return result;
}

function convertObjectToSignatureList(list,keyword){
    var result = []
    list.forEach(function(el){
        if (el['traceSignature']){
            el['traceSignature'].unshift(el[keyword]) // add name of triggered function to traceList
            result.push(convertListToObjects(el['traceSignature']))
        }
    })
    return result;
}


function updateList(list, name){
    list.forEach(function (el){
        if (key(nextExpectedEl(el)) == name){
            passed(nextExpectedEl(el));
            //checkSignatureDone(el);
        }
    })
}



function getExonerateList(list){
    var result = [];
    list.forEach(function(el){
        var nextEl = nextExpectedEl(el)
        if(value(nextEl) == 0){
            result.push(key(nextEl))
        }
    })
    return result;
}

function checkSignatureDone(list){
    var done = true;
    list.forEach(function (el){
        if (value(el) != 1){
            done = false;
        }
    })
    if (done){
        list.forEach(function (el){
            el[1] = 0;
        })
    }
}

function passed(el){
    el[1] = 1;
}


function nextExpectedEl(list){
    var i = 0;
    while(i < list.length){
        if(value(list[i]) == 0){
            return list[i];
        }
        i++;
    }
}


function key (el){
    return el[0];
}

function value (el){
    return el[1];
}


//            module.exports.policy = policy;
window.policy = policy;