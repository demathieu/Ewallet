var alice = require('./alice.js');
var membranes = require('./requirements/membranes.js');
var policyBuilder = require('./requirements/policyBuilder.js');




//var bobSafe = new policyBuilder.policy(c.whiteListAccesControl).allow('removeAmount').install(bob);
var state = {
   condition: function(name,blackList){
    if(blackList.indexOf(name) == -1){
      return true;
      }else{
        return false;
      }
   }
}
var aliceSafe = new policyBuilder.policy(state).allow('removeAmount').install(alice);


//aliceSafe.removeAmount(10);


//bobSafe2.removeAmount(10);


var handler = {
    get: function(target, name){
    	console.log(target);
    	console.log(name);
        return target[name];
         
    }
};

function test (){
	return "test";
}

var p = new Proxy(test, handler);
console.log(p.test;