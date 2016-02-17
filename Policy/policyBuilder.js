var harmony = require('harmony-reflect');
var membranes = require('./requirements/membranes.js');


//new option2.policyWithState(0).allow('use').from(check).condition(((input) => {return input < 1})).install();

function handler(state,whiteList) {
	return handler ={
		get : function(target,name){
			if (state.condition(name,whiteList)){
               return target[name];
			}
			else {
				var err = new Error('No access allowed from Proxy');
				throw err;
			}
		},
		set: function(target,name,val){
			target[name] = val;
		}
	}

}

function requireClean (filePath){
	var wetTarget = require (filePath);
    var bob = membranes.makeMembrane(wetTarget).target;
    return bob;
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
 			return new Proxy(fromValue,handler(state,this.nameFunction));
 		}
 	}
}



module.exports.policy = policy;
module.exports.requireClean = requireClean;
