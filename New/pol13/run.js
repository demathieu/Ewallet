//13: Bob may read the amount property and invoke the deposit method
var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');



accountSafe = new policyBuilder.policy({})
							   .allow([{propertyUpdate:'amount'},{propertyFull:'firstname'}])
							   .install(alice)

// accountSafe = new policyBuilder.policy({})
// 								.allow({method: 'removeAmount',traceSignature:['amount']})
// 								.install(alice)

console.log(accountSafe.amount=1);
//console.log(accountSafe.amount)
//console.log(accountSafe.firstname);
//console.log(accountSafe.lastname);
//accountSafe.amount;