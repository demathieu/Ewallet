var harmony = require('harmony-reflect');
var membranes = require('./requirements/membranes.js');
var Reflect = require('./requirements/reflect.js');
var wm = new WeakMap();

function requireClean (filePath){
	var wetTarget = require (filePath);
    var bob = membranes.makeMembrane(wetTarget).target;
    return bob;
}


function traffic(target){
	if (wm.has(target)){
		return true;
	}else{
		wm.set(target,'inside');
		return false;
	}
}

function handler(state,whiteList) {
	return{
		get : function(target,name,recv){
			console.log("get: " + name);
			var insideOutside = traffic(target);
			if (insideOutside || state.condition(name,whiteList)){
			   traffic(target);
               return Reflect.get(target, name, recv);
			}
			else {
				var err = new Error(name +' is not allowed by the proxy' );
				throw err;
			}
		},
		set: function(target,name,val){
			console.log("set: "+name);
			target[name] = val;
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
 			console.log(typeof handler);
 			return new Proxy(fromValue,handler(state,this.nameFunction));
 		}
 	}
}



module.exports.policy = policy;
module.exports.requireClean = requireClean;
