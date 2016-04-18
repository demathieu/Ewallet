var policyBuilder = require('./policyBuilder.js');
var bob = policyBuilder.requireClean('./bob.js');
//var c = require('./conditioner.js');

var check = {
	amount : 500,
	use: function (person){
	person.amount = person.amount + this.amount;
	}
}

var state = {
	 innerstate: 0,
	 condition: function(name,whiteList){
	 	if(whiteList.indexOf(name) == -1){
	 		if (this.innerstate < 1){
	 			this.innerstate = this.innerstate + 1;
	 		return true;
	 		}else{
	 			return false;
	 		}
	 	}else{
	 		return true;
	 	}

	 }
}

var bobSafe = new policyBuilder.policy(state).allow('removeAmount').install(bob);

bobSafe.removeAmount(10);