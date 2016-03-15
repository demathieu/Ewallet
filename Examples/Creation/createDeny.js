var policyBuilder = require('./requirements/policyBuilder.js');
var alice = require('./alice.js')
var Reflect = require('./requirements/reflect.js');

var handler = {
	construct: function(target, argumentsList) {
		console.log('hier');
    	console.log("called: " + argumentsList.join(", "));
    	return { value: argumentsList[0] * 10 };
  }
}


var p = new Proxy(alice.createAccount, handler);
//console.log(new p(1).value);
console.log(Reflect.construct(alice.createAccount,["t"]))
//console.log(new p(1).value);


//Can't do shit with this construct hook, i can only intercept when someone tries to do new P (so call new on my proxy object)
//not even catch my targetted object
