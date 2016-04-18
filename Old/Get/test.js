var policyBuilder = require('./policyBuilder.js');
var bob = policyBuilder.requireClean('./bob.js');
var c = require('./conditioner.js');

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

var check2 = new policyBuilder.policy(state).allow('use').install(check);

console.log(bob.amount);
check2.use(bob);
console.log(bob.amount);
console.log("hier komt de error");
check2.use(bob);
console.log(bob.amount);

// console.log(check2);
// console.log(state.condition());
