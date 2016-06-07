var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');
var bob = require('./../requirements/bob.js');
var helper = require('./../requirements/helper.js')

leakageSafe = new policyBuilder.policy()
								.deny({propertyFull:'amount', whiteList : [10]})
								.install(alice);

leakageSafe.amount = 10;
