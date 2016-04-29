var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');


var equalFunc = function(name,value,allowedList){
	if (value > allowedList[0]){
		return true;
	}else{
		return false;
	}
}

windowSafe = new policyBuilder.policy({})
.whiteListEqual([5,10],equalFunc)
.deny({method: 'removeAmount'})
.install(alice);


windowSafe.removeAmount(5)