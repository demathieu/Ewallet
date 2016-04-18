var membranes = require('../membranes.js');
var alice = require('../alice.js');
var option2 = require('../option2.js');
var bob = option2.requireClean('./bob.js');


var check = {
	amount : 500,
	use: function (person){
	person.amount = person.amount + this.amount;
	}
}

var check2 = new option2.policyWithState(0).allow('use').from(check).condition(((input) => {return input < 1})).install();

console.log(bob.amount);
check2.use(bob);
console.log(bob.amount);
console.log("hier komt de error");
check2.use(bob);
console.log(bob.amount);
