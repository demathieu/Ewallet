var harmony =require('harmony-reflect');


var handler = {
		construct: function(target, argumentsList) {
		console.log('catched construct');
		return new target(argumentsList);
	}	
}


var carSafe = new Proxy(function(){ 
	 this.color ="red";
	 this.create = function(){
	 	return new carSafe;
	 };
}, handler);


function CreationPolicy(inputFunction,handler){
	var proxy = new Proxy(inputFunction,handler);
	return new proxy();
}

 console.log('start');
// var carSafeObj = new carSafe();
// console.log(carSafeObj.create());
// console.log(carSafeObj.createOther())
var test = CreationPolicy(function(){this.color = "red"},handler);
console.log(test);


// createObject()


// fucntion createobject(input){
// 	var carSafe = new Proxy(input, handler);
// }