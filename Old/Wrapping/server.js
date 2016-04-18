var alice = require('./alice.js')
//var bob = require('./bob.js')
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

var proxyClient1 = new Proxy({},handler);

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

var p = new Proxy({},handler);

console.log("test");

// console.log(alice.firstname);
// alice.friendList.push(bob);

// console.log(proxyClient1.stealCoupon(0));



