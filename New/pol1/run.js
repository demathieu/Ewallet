var policyBuilder = require('./../requirements/policyBuilder.js');

var state = {
	 popuptimes : 0,
	 // the parameters correspond to the ones in handler.set 
	 filter: function(){  
	 	if(this.popuptimes > 2){
	 		return false;
	 	} else {
			this.popuptimes++;
			return true;
		}
	}
}
windowSafe = new policyBuilder.policy(state)
							  .deny({method: 'open'})
							  .install(window);




