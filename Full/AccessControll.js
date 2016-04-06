var policyBuilder = require('./requirements/policyBuilder.js');
var c = require('./requirements/catalogueCondition.js');
var alice = require('./requirements/alice.js');
var Reflect = require('./requirements/reflect.js');


//example one:: Deny Access to lastName of alice     WORKING
//------------------------------------------------------------------------------- 
var aliceSafe = new policyBuilder.policy(c.blackListAccesControl).deny('lastname').install(alice);

// console.log(aliceSafe.firstname);
// console.log(aliceSafe.lastname);  // this is blocked by the proxy as it should


// example two:: Allow only access to the lastname of alice  WORKING
// whitelisting only works on properties 
//------------------------------------------------------------------------------- 
var aliceSafe = new policyBuilder.policy(c.whiteListAccesControl).allow('removeAmount').install(alice);

// console.log(aliceSafe.lastname);
// console.log(aliceSafe.firstname);

console.log(alice.amount);
console.log(aliceSafe.removeAmount(10));
console.log(alice.amount);

// example three:: Deny Access to lastname if it is the second time you try to access it. 		WORKING
//------------------------------------------------------------------------------- 
var state = {
	 innerstate: 0,
	 condition: function(name,whiteList){
	 	if(whiteList == name){
	 		if (this.innerstate < 1){
	 			this.innerstate = this.innerstate + 1;
	 		return true;
	 		}else{
	 			return false;
	 		}
	 	}else{
	 		return true;
	 	}

	 }
}

var aliceSafe = new policyBuilder.policy(state).allow(['lastname','firstname']).install(alice);

// console.log(aliceSafe.lastname);
// console.log(aliceSafe.lastname);


//example four:: Deny Access to removeAmount if the amount is negative    WORKING
//------------------------------------------------------------------------------- 

var state = {
	 condition: function(name,allowedFunctionList,arguments){
	 	if(name == allowedFunctionList){
	 		if(arguments[0] >= 0){
	 			return true;
	 		}else{
	 			return false;
	 		}
	 		
	 	}else { return true;

	 	}
	 }
}
var aliceSafe = new policyBuilder.policy(state).allow('removeAmount').install(alice);
// console.log(aliceSafe.amount)
// aliceSafe.removeAmount(10)
// console.log(aliceSafe.amount)

// console.log(aliceSafe.removeAmount(-10));