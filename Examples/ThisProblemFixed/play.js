var alice = require('./alice.js');
var policyBuilder = require('./requirements/policyBuilder.js');

var state = {
   condition: function(name,blackList){
    // if(blackList.indexOf(name) == -1){
    //   return true;
    //   }else{
    //     return false;
    //   }
   return true;
   }
}
var aliceSafe = new policyBuilder.policy(state).allow('removeAmount').install(alice);

//aliceSafe.removeAmount(10);
//var test = aliceSafe.removeAmount;
//test(10);
console.log(aliceSafe.amount)



// var carl =  {
// 	amount : 0,
// 	removeAmount: function (input){
// 		this.amount = this.amount - input
// 	}
// }

// carl.removeAmount(10);
// var t = carl.removeAmount;
// t(10);
// console.log(carl.amount);
