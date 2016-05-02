var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');
var bob = require('./../requirements/bob.js');
var helper = require('./../requirements/helper.js')

var equalFunc = function(name,value,allowedList){
	if (helper.contains(allowedList,value)){
		return true;
	}else{
		return false;
	}
}

aliceSafe = new policyBuilder.policy({})
.whiteListEqual([10,5],equalFunc)
.deny({method:'removeAmount'})
.install(alice)

		
aliceSafe.removeAmount(10);