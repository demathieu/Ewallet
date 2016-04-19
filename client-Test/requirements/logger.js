var harmony = require('harmony-reflect');
var Reflect = require('./reflect.js');


var handler = {
	get:function(target,name,recv){
		console.log("get: " + name);
		Reflect.get(target,name,recv);
	},
	set: function(target, property, value, receiver){
		console.log("set: " + name);
		Reflect.set(target, property, value, receiver);
	}

}

function logger(target){
	return new Proxy (target,handler);
}