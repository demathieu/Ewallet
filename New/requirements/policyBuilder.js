var harmony = require('harmony-reflect');
var Reflect = require('./reflect.js');

function isEmpty(obj) {
   for (var x in obj) { if (obj.hasOwnProperty(x))  return false; }
   return true;
}

var defaultStateMethodArg =  {
	filter: function(arguments,condition){
	 	if (arguments[0] == condition[0]){
	 		return false;
	 	}else{
	 		return true;
	 	}
	 }
}

var defaultStateMethod = {
	filter: function(){
		return true;
	}
}

function cleanState(inputState,defaultState){
 	if (isEmpty(inputState)){
 		return defaultState;
 	}else{
 		return inputState;
 	}
}

function policy(inputState){
	 this.deny = function(denyObject){
	 	var err = new Error( 'is not allowed by the proxy' );
	 		if (denyObject.hasOwnProperty('method')) {
        			this.handler = {
        				get:function(target,name,recv){
        					console.log("get: " + name);
 							var method = Reflect.get(target, name, recv);
 							if (name === denyObject['method']){
 								if(denyObject.hasOwnProperty('arguments')){
 									return function () {
 										this.state = cleanState(inputState,defaultStateMethodArg);										
 										if (this.state.filter(arguments,denyObject['arguments'])){
	 										return Reflect.apply(method, this, arguments);
	 									}else{
					 						throw err;
	 									}
	 								}
 								}else {
 									 this.state = cleanState(inputState,defaultStateMethod);
 									 if (this.state.filter()){
 										return method;
 									}else{
 										console.log(name);
					 					throw err;
 									}
 								}
 							}else{
 								return method;
 							}
        				}
        			}
        		}else if(denyObject.hasOwnProperty('propertyUpdate')){

        			console.log('TODO')

        		}
		return this;
	 }

	 this.install = function(target){
	 	return new Proxy(target,this.handler);
	 }
}

// function policy(state){
// 	 this.deny = function(denyObject){
// 	 		if (denyObject.hasOwnProperty('method')) {
//         			this.handler = {
//         				get:function(target,name,recv){
//         					console.log("get: " + name);
//  							var method = Reflect.get(target, name, recv);
//  							if (name === denyObject['method']){
//  								if(denyObject.hasOwnProperty('arguments')){
//  									return function () {
//  										if (isEmpty(state)){
//  											if (defaultState.filter(arguments,denyObject['arguments'])){
// 	 											return Reflect.apply(method, this, arguments);
// 	 										}else{
// 	 											var err = new Error( 'is not allowed by the proxy' );
// 					 							throw err;
// 	 										} 											
//  										}else{
//  											if (state.filter(arguments,denyObject['arguments'])){
// 	 											return Reflect.apply(method, this, arguments);
// 	 										}else{
// 	 											var err = new Error( 'is not allowed by the proxy' );
// 					 							throw err;
// 	 										}
//  										}

// 	 								}
//  								}else {
//  									 if (state.filter()){
//  										return method;
//  									}else{
//  										console.log(name);
//  										var err = new Error( 'is not allowed by the proxy' );
// 					 					throw err;
//  									}
//  								}
//  							}else{
//  								return method;
//  							}
//         				}
//         			}
//         		}else if(denyObject.hasOwnProperty('propertyUpdate')){

//         			console.log('TODO')

//         		}
// 		return this;
// 	 }

// 	 this.install = function(target){
// 	 	return new Proxy(target,this.handler);
// 	 }
// }


module.exports.policy = policy;
//window.policy = policy;
