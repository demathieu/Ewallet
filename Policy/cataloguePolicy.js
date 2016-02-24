var c = require('./catalogueCondition.js');
var policyBuilder = require('./policyBuilder.js');
var bob = policyBuilder.requireClean('./bob.js');

function accessControllPolicy ()  {
	return new policyBuilder.policy(c.blackListAccesControl);
}


module.exports.accessControllPolicy = accessControllPolicy;