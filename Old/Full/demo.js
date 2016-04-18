var policyBuilder = require('./requirements/policyBuilder.js');
var c = require('./requirements/catalogueCondition.js');
var alice = require('./requirements/alice.js');
var Reflect = require('./requirements/reflect.js');



var aliceSafeBlack = new policyBuilder.policy(c.blackListAccesControl).deny('lastname').install(alice);

console.log(aliceSafeBlack.removeAmount(10));


//var aliceSafeWhite = new policyBuilder.policy(c.whiteListAccesControl).allow('removeAmount').install(alice);
