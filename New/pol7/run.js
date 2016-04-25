var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');
var bob = require('./../requirements/bob.js');

//7: Policy controlling the redirection of a webpage. 
// Similar to 5 changing property and target


redirectionSafe = new policyBuilder.policy({})
								.whiteList([10,5])
								.deny({propertyUpdate:'amout'})
								.installOnMultipleTargets([alice, bob]);


redirectionSafe[0].amout=10;

locationSafe = new policyBuilder.policy({})
								.whiteList([10,5])
								.deny({method: 'removeAmount'})
								.install(alice);

locationSafe.removeAmount(10);