var harmony = require('harmony-reflect');
var membranes = require('./requirements/membranes.js');


function findAndRemoveFromList(elem,list){
	var i = list.indexOf(elem);
	if(i != -1) {
		list.splice(i, 1);
	}
}

//new option2.policyWithState(0).allow('use').from(check).condition(((input) => {return input < 1})).install();

function requireClean (filePath){
	var wetTarget = require (filePath);
    var bob = membranes.makeMembrane(wetTarget).target;
    return bob;
}

function handler(state,whiteList) {
	return handler ={
		
		get : function(target,name,recv){
			console.log("get: " + name);
			if (state.condition(name,whiteList)){
               return target[name];
			}
			else {
				var err = new Error('No access allowed from Proxy');
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
