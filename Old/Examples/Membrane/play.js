var policyBuilder = require('./requirements/policyBuilder.js');
var c = require('./requirements/catalogueCondition.js');
var alice = require('./requirements/alice.js');
var Reflect = require('./requirements/reflect.js');
var membranes = require('./requirements/membranes.js');
var inside = require ('./requirements/bob.js');



var membrane = membranes.makeMembrane(inside)
var outside = membrane.target;

function handler(){
	return{
		get : function(target,name,recv){
			console.log("get: " + name);
			return Reflect.get(target, name, recv);
		}
	}
}


var pOutside = new Proxy(outside,handler());
var pInside = new Proxy(inside, handler());
var s = new Proxy(alice,handler());



var state = {
   condition: function(name,blackList){
   return true;
   }
}

//var aliceSafe = new policyBuilder.policy(state).allow('removeAmount').install(alice);

// console.log(outside.firstname);
// console.log(outside.bank.name);
// console.log(inside.firstname);

//console.log(pInside.firstname);
console.log(pOutside.firstname);
console.log(pOutside.bank.name);