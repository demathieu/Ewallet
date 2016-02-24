var alice = require('./alice.js');
var bob = require('./bob.js');
var membranes = require('./requirements/membranes.js');
var policyBuilder = require('./policyBuilder.js');

var c = require('./catalogueCondition.js');



var bobSafe = new policyBuilder.policy(c.allowAll).allow('removeAmount').install(bob);

bobSafe.removeAmount(10);

//var bobSafe2 = new policyBuilder.policy(c.allowAll).allow('removeAmount').install(alice);

//bobSafe2.removeAmount(10);