var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');

//5: Policy preventing leakage of information through loading of new images


								
leakageSafe = new policyBuilder.policy({})
								.whiteList(['10'])
								.deny({propertyUpdate:'amount'})				
								.install(alice);

leakageSafe.amount;
leakageSafe.amount = '10';
leakageSafe.amount = '1';


