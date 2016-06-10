var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');

aliceSafe = new policyBuilder.policy()
							  .deny({method:'removeAmount', arguments: '10'})
							  .install(alice);

console.log(aliceSafe.firstname);
console.log(aliceSafe.amount);
aliceSafe.removeAmount(10);