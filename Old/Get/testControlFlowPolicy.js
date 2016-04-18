var alice = require('./alice.js');
var container = require('./bob.js');
var membranes = require('./requirements/membranes.js');
var policyBuilder = require('./policyBuilder.js');

var c = require('./catalogueCondition.js');

// policy().allow(use).passedBy(bank).install(container);


var check = {
	amount : 500,
	valid: false,
	use: function (person){
	person.amount = person.amount + this.amount;
	}
}


var membrane = membranes.makeMembrane(container);
var memContainer = membrane.target;
//console.log(memContainer.bob.firstname);


