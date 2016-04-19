var policyBuilder = require('./requirements/policyBuilder.js');
var alice = require('./requirements/alice.js');


var test = policyBuilder.logger(alice);
console.log(test);
test.removeAmount(10);