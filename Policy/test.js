var policyBuilder = require('./policyBuilder.js');
var bob = policyBuilder.requireClean('./bob.js');
var c = require('./catalogueCondition.js');
var cp = require('./cataloguePolicy.js');

var check = {
	amount : 500,
	use: function (person){
	person.amount = person.amount + this.amount;
	}
}


//var check2 = new policyBuilder.policy(c.accessCounter).allow('use').install(check);


var bobSafe = cp.accessControllPolicy().deny(['removeAmount','lastName']).install(bob)

//var bobSafe = new policyBuilder.policy(c.blackListAccesControl).deny('removeAmount').install(bob);

bob.removeAmount(10)

//bobSafe.removeAmount(10);
console.log(bobSafe.lastName);
console.log(bobSafe.amount);

// console.log(check2);
// console.log(state.condition());
