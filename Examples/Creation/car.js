var harmony =require('harmony-reflect');


var handler = {
		construct: function(target, argumentsList) {
		console.log('catched construct');
		// console.log(target);
		// console.log(argumentsList);
		return new target(argumentsList);
	}	
}


var carSafe = new Proxy(function(){ 
	this.color ="red";
	 this.create = function(){
	 	return new carSafe;
	 }
}, handler);



console.log('start');
var carSafeObj = new carSafe();
console.log(carSafeObj.create());
//console.log(carSafe);


// createObject()


// fucntion createobject(input){
// 	var carSafe = new Proxy(input, handler);
// }