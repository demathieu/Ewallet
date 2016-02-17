var alice = require('./alice.js');
var policyBuilder = require('./policyBuilder.js');
var bob = policyBuilder.requireClean('./bob.js');
var c = require('./catalogueCondition.js');




var blackListAccesControl = {
   condition: function(name,blackList){
    if(blackList.indexOf(name) == -1){
      return true;
      }else{
        return false;
      }
   }
}

//var bobP = new policyBuilder.policy(c.generateConditioner("Access BlackList")).deny('removeAmount').install(bob);
var bobP = new policyBuilder.policy(c.blackListAccesControl).deny('removeAmount').install(bob);
bobP.removeAmount(10);