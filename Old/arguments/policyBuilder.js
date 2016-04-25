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

// var test {
// 	removeAmount : function (){
		
// 	}
// }

// o.f(x,y,z);
// o2.f = o.f;
// o2.f(x,y,z)

function handler(state,whiteList,obj) {
	return{
		get : function(target,name,recv){
			var method = Reflect.get(target, name, recv);
			if (typeof method === "function")
			  return function () {
			  	console.log(arguments)
				return Reflect.apply(method, this, arguments);
			  }
			  console.log(method);
			return method;

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
 			console.log(typeof handler(state,this.nameFunction,fromValue));
 			return new Proxy(fromValue,handler(state,this.nameFunction,fromValue));
 		}
 	}
}



module.exports.policy = policy;
module.exports.requireClean = requireClean;
