var policyBuilder = require('./requirements/policyBuilder.js');
var alice = require('./alice.js')
var Reflect = require('./requirements/reflect.js');
var person = require('./person.js');


//var aliceSafe = new policyBuilder.policy(state).allow('removeAmount').install(alice);


var state = {
   condition: function(property){
   	console.log('trackey');
   	if (property == 'John'){
   		return true;
   	}
    else{
    	return false;
    }
   }
}

// you are only allowed to create a new person with the name John
//catched
//var p = new Proxy(person, handler);
//var t = new p;

var test = new policyBuilder.policy(state).install(person);
var s = new person;
// var t = new test('John');
// console.log(t.firstName);
// var t2 = new test('Frank');


function requireSafe(path,state){
	var importedFunction = require(path);
	var safeFunction = new policyBuilder.policy(state).install(importedFunction);
	return safeFunction
}

var test = requireSafe('./person.js',state);
//console.log(test);
var t = new test('John');

console.log(t.firstName);
//var t2 = new test('Frank');

//console.log(typeof t)
//console.log(t.firstName);
// var t = new person("John", "Doe", 50, "blue");


//var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};

//console.log(typeof person)
// function requireWithPolicy(path,handler){
// 	var alice = require

// }

// var aliceSafe = requireWithPolicy('./alice.js',handler);


//Can't do shit with this construct hook, i can only intercept when someone tries to do new P (so call new on my proxy object)
//not even catch my targetted object


