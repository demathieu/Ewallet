var policyBuilder = require('./../requirements/policyBuilder.js');
var alice = require('./../requirements/alice.js');
var bob = require('./../requirements/bob.js');
var helper = require('./../requirements/helper.js')

var state = {

	filter : function (target, name, value, recv,notusing, inputObject){
		return true;
	}
}
aliceSafe = new policyBuilder.policy(state,'OR')
	.deny({
		method: 'hello',
		 func: function ()
		 {
		 	return this == "hello" ? "hola" : "hola";
		 }

		 })
	.install(alice)

aliceSafe.hello();
