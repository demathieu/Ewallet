var policyBuilder = require('./requirements/policyBuilder.js');
var alice = require('./requirements/alice.js')
var Reflect = require('./requirements/reflect.js');
var person = require('./requirements/person.js');
var helper = require('./requirements/helper.js');

var state = {
	sensitiveResourcesList :['lastname'],
	 condition: function(name,appliedFunctionList,arguments){
	 	if( helper.member(name,appliedFunctionList)&& arguments <= 0 ){
	 		console.log(arguments);
	 		return false;
	 	}
	 	return true;

	
	}
}



var aliceSafe = new policyBuilder.policy(state).deny('amount').install(alice);

console.log(aliceSafe.amount = -10)
