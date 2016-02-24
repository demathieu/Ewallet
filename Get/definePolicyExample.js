var alice = require('./alice.js');
var policyBuilder = require('./policyBuilder.js');
var bob = policyBuilder.requireClean('./bob.js');
var c = require('./catalogueCondition.js');

//var bobP = new policyBuilder.policy(c.generateConditioner("Access BlackList")).deny('removeAmount').install(bob);
var bobP = new policyBuilder.policy(c.allowAll).deny('removeAmount').install(bob);
//console.log(bobP);
//bobP.removeAmount(10);

bobP.removeAmount(10);
//console.log(Object.getOwnPropertyDescriptor(bobP, "removeAmount"));




var p = new Proxy(function() {}, {
  apply: function(target, thisArg, argumentsList) {
    console.log("called: " + argumentsList.join(", "));
    return argumentsList[0] + argumentsList[1] + argumentsList[2];
  }
});

console.log(p(1, 2, 3));

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/apply