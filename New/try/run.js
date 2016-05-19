var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');
var bob = require('./../requirements/bob.js');
var helper = require('./../requirements/helper.js')

aliceSafe = new policyBuilder.policy()
	.deny([{method: 'removeAmount'},{propertyRead: 'amount'},{method: 'removeAmountNothing'},{method: 'removeAmount3'},{propertyFull: 'amount'}])
	.install(alice);

	aliceSafe.amount=10;
	//aliceSafe.lastname;
	//aliceSafe.removeAmountNothing();
