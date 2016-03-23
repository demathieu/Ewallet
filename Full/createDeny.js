var policyBuilder = require('./requirements/policyBuilder.js');
var alice = require('./requirements/alice.js')
var Reflect = require('./requirements/reflect.js');

function requireSafe(path,state){
  var importedFunction = require(path);
  var safeFunction = new policyBuilder.policy(state).install(importedFunction);
  return safeFunction
}


//example one:: You are only allowed to create a new person when it has the name John    WORKING
//------------------------------------------------------------------------------- 


var state = {
   condition: function(property){
    if (property == 'John'){
      return true;
    }
    else{
      return false; 
    }
   }
}


var personSafe = requireSafe('./requirements/person.js',state);

var tallowed = new personSafe('John');
console.log(tallowed.firstName);


var tdeny = new personSafe('Eddy');
//console.log(tdeny.firstName);
