
var membranes = require('./requirements/membranes.js');
var policyBuilder = require('./requirements/policyBuilder.js');
//var alice = policyBuilder.requireClean('../alice.js');
var alice = require('./alice');
var Reflect = require('./requirements/reflect.js');

var inside = require ('./bob.js');
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