var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');
var bob = require('./../requirements/bob.js');
var helper = require('./../requirements/helper.js')

// //6: writing to the document.location, window.location and the src property of the instances of Frame, IFrame, Image and Form classes should only be permitted if the sensitive data fields have not been previously read or the new location is in an URL whitelist allowed by the policy.
// var state = {
// 	 cookiesRead : false,
// 	 listenerCookiesRead: {
// 		// the parameters correspond to the ones in handler.get
// 		notify: function(target, name, value, receiver) {
// 			state.cookiesRead = true;
// 		}
// 	 },
// 	 filter: function(target,name,receiver){
// 	 	if (state.cookiesRead){
// 	 		return false;
// 	 	}else{
// 	 		return true;
// 	 	}

// 	}
// }



// readSensitiveData = new	policyBuilder.policy(state)
// 								.monitor({propertyRead:'firstname', listener: state.listenerCookiesRead})
// 								.install(alice);

// leakageSafeOnDocumentLocation = new policyBuilder.policy(state)
// 								.whiteList([10])
// 								.deny({propertyUpdate:'amount'})
// 								.install(alice);

// //readSensitiveData.firstname;
// leakageSafeOnDocumentLocation.amount = 0;



aliceSafe = new policyBuilder.policy({})
.deny({method:'removeAmount',arguments:[10,5]})
.install(alice)


aliceSafe.removeAmount(0);