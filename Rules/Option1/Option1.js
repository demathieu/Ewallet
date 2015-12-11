var harmony =require('harmony-reflect');


function crHandler(whiteList){

	return handler = {
		get: function (target,name){
			console.log(whiteList);
			if (whiteList.indexOf(whiteList) == -1){
				console.log('No access');
			}
			else{
				return target[name];
			}	
		}
	}

}

function crHandlerForRules(){

	return handler = {
		get: function (target,name){
			console.log(name);
			if (name == 'allow'){
				console.log('then');
				var proxy = new Proxy(target,crHandler('spendCoupon'));
				console.log('create proxy');
				return proxy
			}
			else{
				//return target[name];
				console.log('else')
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
///////////////////////////////////////////////////////////////////// ALL Above is Backhand

//bob.allow(execute,’spendCoupon’,Alice)

//var whiteList = ['stealCoupon'];
//var alice = load('./alice.js',whiteList)
var bob = load('./bob.js')
//var bob = require('./bob.js');

var bobRuleApplied = bob.allow('execute','spendCoupon','Alice'); 
alice.friendList.push(bobRuleApplied);

//console.log(alice.stealCoupon(0));




