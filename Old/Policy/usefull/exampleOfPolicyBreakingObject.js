var alice = require('./alice.js');
var bob = require('./bob.js');
var membranes = require('./requirements/membranes.js');
var policyBuilder = require('./policyBuilder.js');

var c = require('./catalogueCondition.js');



var bobSafe = new policyBuilder.policy(c.whiteListAccesControl).allow('removeAmount').install(bob);

bobSafe.removeAmount(10);