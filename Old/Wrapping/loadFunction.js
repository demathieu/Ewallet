var harmony =require('harmony-reflect');

var handler = {
	get: function (target,name){
		console.log('Get request');
		if (name == 'stealCoupon'){
			console.log('No access');
		}
		else{
			return target[name];
		}	
	}
}

function load (filePath){
	var importedObject = require (filePath);
	var proxyClient = new Proxy(importedObject,handler);
	return proxyClient;
}
///////////////////////////////////////////////////////////////////// ALL Above is Backhand


var alice = load('./alice.js')
var bob = load('./bob.js')

alice.friendList.push(bob);

console.log(alice.stealCoupon(0));



