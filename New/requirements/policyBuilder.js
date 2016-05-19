'use strict'

var harmony = require('harmony-reflect');
var Reflect = require('./reflect.js');
var helper = require('./helper.js');
var _ = require('lodash');

function isEmpty(obj) {
  for (var x in obj) {
    if (obj.hasOwnProperty(x)) return false;
  }
  return true;
}

var defaultStateMethodArg = {
  filter: function(target, name, args, recv, condition) {
    if (typeof condition == "undefined" || args[0] == condition[0]) {
      return false;
    } else {
      return true;
    }
  }
}

var defaultStateMethodArgAllow = {
  filter: function(target, name, args, recv, condition) {
    if (typeof condition == "undefined" || args[0] == condition[0]) {
      return true;
    } else {
      return false;
    }
  }
}

var defaultWhiteList = {
  filter: function(target, name, args, recv, whiteList) {
    if (helper.contains(whitelist, name)) {
      return false;
    } else {
      return true;
    }
  }
}



function cleanState(inputState, defaultState) {
  if (isEmpty(inputState[0])) {
    inputState[0] = defaultState;
  }
  return inputState;
}

function typePolicy(denyObject, typeList) {
  var result = false;
  typeList.forEach(function(el) {
    if (getAllPropWithKey(denyObject, [el]).length != 0) {
      result = true;
    }
  });
  return result;
}

function getAllProp(list) {
  var val = [];
  list.forEach(function(el) {
    Object.keys(el).forEach(function(key) {
      val.push(el[key]);
    });
  })
  return val;
}

function getAllPropWithKey(list, keywords) {
  var val = [];
  list.forEach(function(el) {
    Object.keys(el).forEach(function(key) {
			keywords.forEach(function (keyword){
				if (key == keyword) {
					val.push(el[key]);
				}
			});
    });
  })
  return val;
}

function filterChainAnd(filterList, target, name, args, recv, condition) {
  var filterValue = true;
  var i = 0;
  while (filterValue && i < filterList.length) {
    filterValue = filterList[i].filter(target, name, args, recv, condition);
    i++;
  }
  return filterValue;
}

function filterChainOR(filterList, target, name, args, recv, condition) {
  var filterValue = false;
  var i = 0;
  console.log(filterList)
  while (!filterValue && i < filterList.length) {
    filterValue = filterList[i].filter(target, name, args, recv, condition);
    i++;
  }
  return filterValue;
}

function filterChain(operandString) {
  if (operandString == 'AND') {
    return filterChainAnd;
  } else {
    return filterChainOR;
  }
}

function filterCombinator(type, that, state, chainOperator, defaultState, target, name, argscalled, recv, argsObject) {
  var err = new Error('is not allowed by the proxy');
  that.state = cleanState(state, defaultState);
  if (filterChain(chainOperator)(that.state, target, name, argscalled, recv, argsObject)) {
    if (type === 'function') {
      return target[name].apply(that, argscalled);
    } else {
      Reflect.get(target, name, recv);
    }
  } else {
    throw err;
  }
}

function policy(inputState, chainOperator) {
  this.handler = {};
  this.state = [inputState];
  this.deny = function(denyObjectList) {
    if (denyObjectList.constructor == Array) {
      var denyObject = denyObjectList;
    } else {
      var denyObject = []
      denyObject.push(denyObjectList);
    }
    var state = this.state;
    var err = new Error('is not allowed by the proxy');
    console.log(denyObject)
    if (typePolicy(denyObject, ['propertyRead', 'method','propertyFull'])) {
      this.handler["get"] = function(target, name, recv) {
        console.log("get: " + name);
        var method = Reflect.get(target, name, recv);
        var properties = getAllProp(denyObject);
        if (helper.contains(properties, name)) {
          if (typeof method === 'function') {
            return function(...args) {
              var correctObject = denyObject.find(function(el) {
                return el.method === name
              })
              filterCombinator('function', this, state, chainOperator, defaultStateMethodArg, target, name, args, recv, correctObject['arguments']);
            }
          } else {
            filterCombinator('property', this, state, chainOperator, defaultStateMethodArg, target, name, [], recv);
          }
        } else {
          return Reflect.get(target, name, recv);
        }
      }
    }
    if (typePolicy(denyObject, ['propertyUpdate','propertyFull'])) {
      var state = this.state;
      this.handler["set"] = function(target, name, value, recv) {
        console.log("set: " + name);
        var properties = getAllPropWithKey(denyObject,['propertyUpdate','propertyFull']);
        console.log(properties)
        if (helper.contains(properties, name)) {
          this.state = cleanState(state, defaultStateMethodArg);
          if (filterChain(chainOperator)(this.state, target, name, value, recv)) {
            Reflect.set(target, name, value, recv);
          } else {
            throw err;
          }
        }
        Reflect.set(target, name, value, recv);
      }
    }
    return this;
  }

  this.whiteList = function(allowedList) {
    this.state.push({
      filter: function(target, name, value, receiver) {
        if (value.constructor == Object) {
          var val = []
          Object.keys(value).forEach(function(key) {
            val.push(value[key]);
          });
          return helper.containsMultiList(allowedList, val)
        }
        return helper.contains(allowedList, value)
      }
    })
    return this;
  }

  this.whiteListEqual = function(allowedList, equalityFunc) {
    this.state = {
      filter: function(target, name, value, receiver) {
        if (value.constructor == Object) {
          var val = []
          Object.keys(value).forEach(function(key) {
            val = value[key];
          });
          return equalityFunc(name, val, allowedList);
        }
        return equalityFunc(name, value, allowedList);
      }
    }
    return this;
  }

  this.monitor = function(monitorObjectList) {
    //var state = this.state;
    var err = new Error('is not allowed by the proxy');
    if (monitorObjectList.constructor == Array) {
      var monitorObject = monitorObjectList;
    } else {
      var monitorObject = []
      monitorObject.push(monitorObjectList);
    }
    if (monitorObject[0].hasOwnProperty('propertyRead') && monitorObject[0].hasOwnProperty('listener')) {
      this.handler = {
        get: function(target, name, recv) {
          var properties = getAllPropWithKey(monitorObject, ['propertyRead'])
          console.log(properties)
          if (helper.contains(properties, name)) {
            var listeners = getAllPropWithKey(monitorObject, ['listener']);
            listeners[0].notify(target, name, recv);
          }
          return Reflect.get(target, name, recv);
        }
      }
    }
    return this;

  }

  this.install = function(target) {
    console.log("handler")
    console.log(this.handler)
    return new Proxy(target, this.handler);
  }

  this.allow = function(allowObjectList) {
    var state = this.state;
    var err = new Error('is not allowed by the proxy');
    if (allowObjectList.constructor == Array) {
      var allowObject = allowObjectList;
    } else {
      var allowObject = []
      allowObject.push(allowObjectList);
    }
    if (allowObject[0].hasOwnProperty('method')) {
      var sigList = convertObjectToSignatureList(allowObject, 'method')
      this.handler = {
        get: function(target, name, recv) {
          console.log("get: " + name)
          var funcList = Object.getOwnPropertyNames(target);
          if (helper.contains(funcList, name) && name != 'state') {
            var properties = getAllPropWithKey(allowObject, ['method']);
            if (helper.contains(properties, name) || helper.contains(getExonerateList(sigList), name)) {
              updateList(sigList, name);
              return function(...args) {
                this.state = cleanState(state, defaultStateMethodArgAllow);
                var correctObject = allowObject.find(function(el) {
                  return el.method === name
                })
                if (filterChain(chainOperator)(this.state, target, name, args, recv, correctObject['arguments'])) {
                  return target[name].apply(this, args);
                } else {

                  throw err;
                }
              }
            } else {

              throw err;
            }
          } else {
            return Reflect.get(target, name, recv);
          }
        }
      }
    } else if (allowObject[0].hasOwnProperty('propertyRead')) {
      this.handler = {
        get: function(target, name, recv) {
          var properties = getAllPropWithKey(allowObject, ['propertyRead']);
          if (helper.contains(properties, name)) {
            return Reflect.get(target, name, recv);
          } else {
            throw err;
          }
        },
        set: function(target, name, value, recv) {
          throw err;
        }
      }
    } else if (allowObject[0].hasOwnProperty('propertyUpdate')) {
      this.handler = {
        get: function(target, name, recv) {
          throw err;
        },
        set: function(target, name, value, recv) {
          var properties = getAllPropWithKey(allowObject, ['propertyUpdate']);
          if (helper.contains(properties, name)) {
            return Reflect.set(target, name, value, recv);
          } else {
            throw err;
          }
        }
      }

    } else {
      this.handler = {
        get: function(target, name, recv) {
          var properties = getAllPropWithKey(allowObject, ['propertyFull']);
          if (helper.contains(properties, name)) {
            return Reflect.get(target, name, recv);
          } else {
            throw err;
          }
        },
        set: function(target, name, value, recv) {
          var properties = getAllPropWithKey(allowObject, ['propertyFull']);
          if (helper.contains(properties, name)) {
            return Reflect.set(target, name, value, recv);
          } else {
            throw err;
          }
        }
      }
    }
    return this;
  }

  this.installOnMultipleTargets = function(listOfTargets) {
    var listOfProxy = [];
    for (var i = 0; i < listOfTargets.length; i++) {
      var temp = new Proxy(listOfTargets[i], this.handler);
      listOfProxy.push(temp);
    }
    return listOfProxy;
  }
}

module.exports.policy = policy;
//window.policy = policy;

// if (!Array.prototype.find) {
// 	Array.prototype.find = function(predicate) {
// 		if (this === null) {
// 			throw new TypeError('Array.prototype.find called on null or undefined');
// 		}
// 		if (typeof predicate !== 'function') {
// 			throw new TypeError('predicate must be a function');
// 		}
// 		var list = Object(this);
// 		var length = list.length >>> 0;
// 		var thisArg = arguments[1];
// 		var value;
//
// 		for (var i = 0; i < length; i++) {
// 			value = list[i];
// 			if (predicate.call(thisArg, value, i, list)) {
// 				return value;
// 			}
// 		}
// 		return undefined;
// 	};
// }

function convertListToObjects(list) {
  var result = [];
  list.forEach(function(el) {
    var obj = [];
    obj = [el, 0]
    result.push(obj);
  })
  return result;
}

function convertObjectToSignatureList(list, keyword) {
  var result = []
  list.forEach(function(el) {
    if (el['traceSignature']) {
      el['traceSignature'].unshift(el[keyword]) // add name of triggered function to traceList
      result.push(convertListToObjects(el['traceSignature']))
    }
  })
  return result;
}


function updateList(list, name) {
  list.forEach(function(el) {
    if (key(nextExpectedEl(el)) == name) {
      passed(nextExpectedEl(el));
      //checkSignatureDone(el);
    }
  })
}



function getExonerateList(list) {
  var result = [];
  list.forEach(function(el) {
    var nextEl = nextExpectedEl(el)
    if (value(nextEl) == 0) {
      result.push(key(nextEl))
    }
  })
  return result;
}

function checkSignatureDone(list) {
  var done = true;
  list.forEach(function(el) {
    if (value(el) != 1) {
      done = false;
    }
  })
  if (done) {
    list.forEach(function(el) {
      el[1] = 0;
    })
  }
}

function passed(el) {
  el[1] = 1;
}


function nextExpectedEl(list) {
  var i = 0;
  while (i < list.length) {
    if (value(list[i]) == 0) {
      return list[i];
    }
    i++;
  }
}


function key(el) {
  return el[0];
}

function value(el) {
  return el[1];
}
