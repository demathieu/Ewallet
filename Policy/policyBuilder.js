var harmony = require('harmony-reflect');
var membranes = require('./requirements/membranes.js');


function findAndRemoveFromList(elem,list){
	var i = list.indexOf(elem);
	if(i != -1) {
		list.splice(i, 1);
	}
}

//new option2.policyWithState(0).allow('use').from(check).condition(((input) => {return input < 1})).install();

function handler(state,whiteList) {
	return handler ={
		get : function(target,name){
			console.log("get: " + name);
			if (state.condition(name,whiteList)){
				//console.log("get: " + name);
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

function handlerCF(state,whiteList,passedByList) {
	return handler ={
		get : function(target,name){
			if (passedByList.indexOf(name) != -1){
				findAndRemoveFromList(name,passedByList);
			}
			if (state.condition(name,whiteList,passedByList)){
				console.log("get: " + name);
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
		},
		apply : function(target,undefined,list){
			console.log(undefined);
			console.log(list);
			console.log("test");

		}
	}

}

function policyControlFlow(state){
this.allow = function(input){
 		this.nameFunction = input;
 		return this;
 	}
 	this.deny = function(input){
 		this.nameFunction = input;
 		return this;
 	}

 	this.passedBy = function(input){
 		this.objectToPassBy = input;
 		return this;
 	}

 	this.install = function(fromValue){
 		if (true){
 			return new Proxy(fromValue,handlerCF(state,this.nameFunction,this.objectToPassBy));
 		}
 	}
}


module.exports.policy = policy;
module.exports.policyControlFlow = policyControlFlow;
module.exports.requireClean = requireClean;
