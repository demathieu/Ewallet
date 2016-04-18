var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');

//4: Policy to disallow iframe creation


var state = {
	 // the parameters correspond to the ones in handler.set 
	 filter: function(arguments,condition){
	 	if (arguments[0] == condition[0]){
	 		return false;
	 	}else{
	 		return true;
	 	}
	 }

}

locationSafe = new policyBuilder.policy({})
								.deny({method:'removeAmount', arguments: ['10']})
								.install(alice);

locationSafe.removeAmount(5);
console.log('should block');
//locationSafe.removeAmount(10);
