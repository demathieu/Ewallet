var harmony = require('harmony-reflect');
var membranes = require('./membranes.js');
var Reflect = require('./reflect.js');

function requireClean (filePath){
	var wetTarget = require (filePath);
    var bob = membranes.makeMembrane(wetTarget).target;
    return bob;
}


function handler(state,whiteList,obj) {
	return{
		get : function(target,name,recv){
			console.log("get: " + name);
			console.log(target);
			var method = Reflect.get(target, name, recv);
			//return method;
			if (typeof method === "function")
			  return function () {
				if (state.condition(name,whiteList,arguments)){			 
               		return Reflect.apply(method, target, arguments);
				}
				else {
					var err = new Error(name +' is not allowed by the proxy' );
					throw err;
				}
			  }
			  
			if (state.condition(name,whiteList)){			 
               return method
			}
			else {
				var err = new Error(name +' is not allowed by the proxy' );
				throw err;
			}
		},
		set: function(target,name,val){
			console.log("set: "+name);
			//target[name] = val;
			Reflect.set(target,name,val);
		}
	}

}

function policy(state){
 	this.allow = function(input){
 		this.nameFunction = input;
 		return this;
 	}
 	this.deny = function(input){
 		this.nameFunction = input;
 		return this;
 	}

 	this.install = function(fromValue){
 		if (true){
 			return new Proxy(fromValue,handler(state,this.nameFunction,fromValue));
 		}
 	}
}



module.exports.policy = policy;
module.exports.requireClean = requireClean;
