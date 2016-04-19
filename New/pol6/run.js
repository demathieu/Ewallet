var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');


//6: writing to the document.location, window.location and the src property of the instances of Frame, IFrame, Image and Form classes 
//should only be permitted if the sensitive data fields have not been previously read 
//or the new location is in an URL whitelist allowed by the policy.

var state = {
	 cookiesRead : false;
	 listenerCookiesRead: {
		// the parameters correspond to the ones in handler.get
		notify: function(target, name, value, receiver) {
			cookiesRead = true;
		}
	 }
	 filter: function(target,name,receiver){
	 	if ( cookiesRead)
		return false;
	}
}


readSensitiveData = new	policyBuilder.policy(state)
								.monitor({propertyRead:'firstname', listener: state.listenerCookiesRead}))
								.install(alice);