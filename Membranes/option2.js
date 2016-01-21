var harmony =require('harmony-reflect');


function crHandlerWhite(whiteList){

	return handler = {
		get: function (target,name){
			if (whiteList.indexOf(name) == -1){
				var err = new Error('No access');
    			throw err;
			}
			else{
				return target[name];
			}	
		}
	}

}

function crHandlerBlack(blackList){

	return handler = {
		get: function (target,name){
			if (blackList.indexOf(name) == -1){ //if function name is not in the list
				return target[name];
			}
			else{
				var err = new Error('No access');
    			throw err;
			}	
		}
	}

}

function load (filePath,whiteList){
	var importedObject = require (filePath);
	var handler = crHandlerForRules(whiteList);
	var proxyClient = new Proxy(importedObject,handler);
	return proxyClient;
}

function policy(){
 	//var  nameFunction;
 	this.allow = function (input){
 		this.nameFunction = input;
 		this.allowedOrDeny = true;
 		return this;
 	}
 	
 	this.deny = function(input){
 			this.nameFunction = input;
 			this.allowedOrDeny = false;
 			return this;
 	}

 	this.from = function(input){
 		this.fromValue = input;
 		return this;
 	}

 	this.to = function (input){
 		this.toValue = input;
 		return this;
 	}

 	this.install = function(){
 		if (this.allowedOrDeny){
 			return new Proxy(this.fromValue,crHandlerWhite(this.nameFunction));
 		}
 		else{
 			return new Proxy(this.fromValue,crHandlerBlack(this.nameFunction));
 		}
 	}
}

//var Policy =  {
//	varDeny : 't',
//	deny : function(input){
//		this.varDeny = input;
//	}
//}

///////////////////////////////////////////////////////////////////// ALL Above is Backhand

//new Policy()
//.deny(‘spendCoupon’)
//.from(‘bob’)
//.to(‘alice’) .install()
//var p = new Policy().deny('test');
//var p = new Policy();
var bob = require ('./bob.js');
//var alice = require('./alice.js');
var p = new policy().allow('spendCoupon').from(bob).to('alice').install();
try{
	p.spendCoupon(5);
}
catch (err){
	console.log(err);
}

//var bobRuleApplied = bob.allow('execute','spendCoupon','Alice'); 
//alice.friendList.push(p);
//alice.friendList[0].spendCoupon(5);


module.exports.policy = policy;
//module.exports = test;


