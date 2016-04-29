var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');


//9: Policy preventing potential forgery attacks. This is what we want to allow, the other things should be denied
//window.open("", "", "location=yes,status=yes");
								
locationSafe = new policyBuilder.policy({})
								.whiteList([[],[],[5,10]])								
								.deny({method: 'removeAmount3'})
								.install(alice)

// locationSafe = new policyBuilder.policy({})
// 								.whiteList([5,10])								
// 								.deny({method: 'removeAmount'})
// 								.install(alice)

locationSafe.removeAmount(10)
locationSafe.removeAmount3(0,0,10);
locationSafe.removeAmount3(0,0,6);