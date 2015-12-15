var harmony =require('harmony-reflect');


function crHandlerWhite(whiteList){

	return handler = {
		get: function (target,name){
			console.log(whiteList);
			if (whiteList.indexOf(name) == -1){
				console.log('No access');
			}
			else{
				console.log(whiteList.indexOf(name));
				return target[name];
			}	
		}
	}

}

function crHandlerBlack(blackList){

	return handler = {
		get: function (target,name){
			console.log(blackList);
			if (blackList.indexOf(name) == -1){
				console.log('No access');
			}
			else{
				console.log(blackList.indexOf(name));
				return target[name];
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

function Policy(){
 	//var  nameFunction;
 	this.allow = function (input){
 		this.nameFunction = input;
 		return this;
 	}
 	
 	this.deny = function(input){
 			this.nameFunction = input;
 			this.denyOrAllow = 'deny';
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
 		return new Proxy(this.fromValue,crHandler(this.nameFunction));
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
var alice = require('./alice.js');
var p = new Policy().deny('spendCoupon').from(bob).to('alice').install();

//var bobRuleApplied = bob.allow('execute','spendCoupon','Alice'); 
alice.friendList.push(p);
alice.friendList[0].spendCoupon(5);





