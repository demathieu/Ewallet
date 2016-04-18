var policyBuilder = require('./requirements/policyBuilder.js');
var alice = require('./requirements/alice.js')
var Reflect = require('./requirements/reflect.js');
var person = require('./requirements/person.js');

function requireSafe(path,state){
  var importedFunction = require(path);
  var safeFunction = new policyBuilder.policy(state).install(importedFunction);
  return safeFunction
}


//example one:: You are only allowed to create a new person when it has the name John    WORKING
//------------------------------------------------------------------------------- 


var state = {
   condition: function(name){
     
    return true;
   }
}


// var personSafe = requireSafe('./requirements/person.js',state);

// var tallowed = new personSafe('John');
// console.log(tallowed.firstName);


// var tdeny = new personSafe('Eddy');
//console.log(tdeny.firstName);


function makeSafeObject(obj,state){
  //var test = new person('test');
  //return new obj;
  var safeObject = new policyBuilder.policy(state).install(obj);
  return safeObject;
}


//var test = new person('test');
var personObj = new person;
var test = makeSafeObject(personObj,state);

//console.log('tests');
//var testobj = new test;
console.log('tests');
//var testobj = test.createNew();
console.log(test.createNew());


// var test = new person;
// console.log(test.removeAmount(10));