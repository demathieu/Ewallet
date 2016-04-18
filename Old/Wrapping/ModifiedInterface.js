var harmony =require('harmony-reflect');


function createHandler(whiteList){

	return handler = {
		get: function (target,name){
			console.log("test");
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



function load (filePath,whiteList){
	var importedObject = require (filePath);
	var handler = createHandler(whiteList);
	var proxyClient = new Proxy(importedObject,handler);
	return proxyClient;
}
///////////////////////////////////////////////////////////////////// ALL Above is Backhand



var whiteList = ['stealCoupon'];
var alice = load('./alice.js',whiteList)
var bob = load('./bob.js',whiteList)

alice.friendList.push(bob);

console.log(alice.stealCoupon(0));




