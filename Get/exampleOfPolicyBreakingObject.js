var alice = require('./alice.js');
var bob = require('./bob.js');
var membranes = require('./requirements/membranes.js');
var policyBuilder = require('./policyBuilder.js');

var c = require('./catalogueCondition.js');



var bobSafe = new policyBuilder.policy(c.whiteListAccesControl).allow('removeAmount').install(bob);
//var bobSafe = new policyBuilder.policy(c.blackListAccesControl).allow('removeAmount').install(bob);


bobSafe.removeAmount(10);
bobSafe.amount;

//bobSafe2.removeAmount(10);