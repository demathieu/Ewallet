var alice = require('./alice.js');
var policyBuilder = require('./requirements/policyBuilder.js');

var state = {
   condition: function(name,blackList){
   return true;
   }
}
// var aliceSafe = new policyBuilder.policy(state).allow('removeAmount').install(alice);
// console.log(aliceSafe.amount)




var aliceSafe = new policyBuilder.policy(state).allow('removeAmount').install(alice);
console.log(aliceSafe.removeAmount(10))