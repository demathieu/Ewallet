var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');
var bob = require('./../requirements/bob.js');

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
								.installOnMultipleTargets([alice,bob]);

locationSafe[0].removeAmount(5);
locationSafe[1].removeAmount(10);
console.log('should block');
//locationSafe.removeAmount(10);
