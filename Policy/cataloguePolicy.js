var c = require('./catalogueCondition.js');
var policyBuilder = require('./policyBuilder.js');
var bob = policyBuilder.requireClean('./bob.js');

function accessControllPolicy()  {
	return new policyBuilder.policy(c.allowAll);
}

function accessControllPolicy2(listOfFunctions,bob){
	console.log(bob);
	console.log(listOfFunctions);
	return new new policyBuilder.policy(c.allowAll).deny(listOfFunctions).install(bob);
}

module.exports.accessControllPolicy = accessControllPolicy;
module.exports.accessControllPolicy2 = accessControllPolicy2;