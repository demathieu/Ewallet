var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');

var state = {
	 popuptimes : 0,
	 // the parameters correspond to the ones in handler.set 
	 filter: function(){  
	 	if(this.popuptimes >= 2){
	 		return false;
	 	} else {
			this.popuptimes++;
			return true;
		}
	}
}
windowSafe = new policyBuilder.policy(state)
							  .deny({method: 'removeAmount'})
							  .install(alice);




 windowSafe.removeAmount(10);
// windowSafe.removeAmount(10);
// windowSafe.amount;
// windowSafe.amount;
windowSafe.removeAmount(10);
//windowSafe.removeAmount(10);