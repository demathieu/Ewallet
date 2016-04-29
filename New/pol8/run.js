var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');
var bob = require('./../requirements/bob.js');

//8: Policy preventing impersonation attacks using XMLHttpRequest object.


locationSafe = new policyBuilder.policy({})
								.whiteList([10,5])
								.deny([{method: 'removeAmount'},{method: 'removeAmount2'}])
								.install(alice);

locationSafe.removeAmount(10);
locationSafe.removeAmount2(10)