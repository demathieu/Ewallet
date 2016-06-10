var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');

aliceSafe = new policyBuilder.policy()
							  .deny({propertyUpdate:'amount', whiteList:[5]})
							  .install(alice);

aliceSafe.amount = 10;
