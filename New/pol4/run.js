var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');
var bob = require('./../requirements/bob.js');

//4: Policy to disallow iframe creation



locationSafe = new policyBuilder.policy({})
								.deny({method:'removeAmount', arguments: ['10']})
								.install(alice);

//locationSafe.removeAmount(5);
locationSafe.removeAmount(10);
console.log('should block');
//locationSafe.removeAmount(10);
