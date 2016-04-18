var harmony = require('harmony-reflect');
var bob = require('./bob.js');
 

function handler() {
	return handler ={
		get : function(target,name,recv){
			console.log("get: " + name);
			console.log(Object.getOwnPropertyNames(recv));
			console.log(Object.getOwnPropertyNames(target));
			target['test']='test';
			console.log(Object.getOwnPropertyNames(recv));
			console.log(Object.getOwnPropertyNames(target));
			console.log(target.test);
			console.log(recv.test);
			console.log('done');
			return target[name];

		},
		set: function(target,name,val){
			console.log("set: "+name);
			target[name] = val;
		}
	}

}

function handler2() {
	return handler ={
		get : function(target,name,recv){
			console.log("get: " + name);
			//console.log(target.keys);
			console.log(Object.getOwnPropertyNames(recv));
			//console.log(recv.firstname);
			console.log('done');
			return target[name];

		},
		set: function(target,name,val){
			console.log("set: "+name);
			target[name] = val;
		}
	}

}

// create one proxy
//console.log(Object.getOwnPropertyNames(bob));
var bobP = new Proxy(bob,handler());
bobP.firstname;
//bobP.removeAmount(10);

// create a proxy of the previous proxy

//var bobPP = new Proxy(bobP,handler2());
//bobPP.firstname;
//bobPP.removeAmount(10);