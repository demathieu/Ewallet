var harmony = require('harmony-reflect');
var Reflect = require('./requirements/reflect.js');
var alice = require('./alice.js');
var policyBuilder = require('./policyBuilder.js');

var state  = {
   condition: function(name,whiteList){
    return true;
  }
}

var aliceSafe = new policyBuilder.policy(state).allow('removeAmount').install(alice);

//aliceSafe.removeAmount(10)
var test = aliceSafe.removeAmount;
test(10);
console.log(aliceSafe.amount)
