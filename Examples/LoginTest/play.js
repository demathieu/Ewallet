var policyBuilder = require('./requirements/policyBuilder.js');
var c = require('./requirements/catalogueCondition.js');
var alice = require('./requirements/alice.js');
var Reflect = require('./requirements/reflect.js');

// define a policy that allows Login without allowing the outside to check the password property


aliceSafe = new policyBuilder.policy(c.allowAll).allow('login').install(alice);

console.log(aliceSafe.login('haha'));
console.log('second option');
console.log(aliceSafe.loginBad('haha'));