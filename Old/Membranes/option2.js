var harmony =require('harmony-reflect');
var membranes = require('./membranes.js');

function crHandlerWhite(whiteList){

	return handler = {
		get: function (target,name){
			if (whiteList.indexOf(name) == -1){
				var err = new Error('No accessW');
    			throw err;
			}
			else{
				return target[name];
			}	
		},
		set: function(target,name,val){
			target[name]=val;
		}
	}

}

function crHandlerBlack(blackList){
	return handler = {
		get: function (target,name){
			if (blackList.indexOf(name) == -1){ //if function name is not in the list
				return target[name];
			}
			else{
				var err = new Error('No accessB');
    			throw err;
			}	
		},

		set: function(target,name,val){
			target[name]=val;
		}
	}

}




function load (filePath,whiteList){
	var importedObject = require (filePath);
	var handler = crHandlerForRules(whiteList);
	var proxyClient = new Proxy(importedObject,handler);
	return proxyClient;
}
function requireClean (filePath){
	var wetTarget = require (filePath);
    var bob = membranes.makeMembrane(wetTarget).target;
    return bob;
}

function policy(){
 	this.allow = function (input){
 		this.nameFunction = input;
 		this.allowedOrDeny = true;
 		return this;
 	}
 	
 	this.deny = function(input){
 			this.nameFunction = input;
 			this.allowedOrDeny = false;
 			return this;
 	}

 	this.from = function(input){
 		this.fromValue = input;
 		return this;
 	}

 	this.to = function (input){
 		this.toValue = input;
 		return this;
 	}

 	this.condition = function (input){
 		this.condition = input;
 		return this;
 	}

 	this.install = function(){
 		if (this.allowedOrDeny){
 			return new Proxy(this.fromValue,crHandlerWhite(this.nameFunction));
 		}
 		else{
 			return new Proxy(this.fromValue,crHandlerBlack(this.nameFunction));
 		}
 	}
}



function crHandlerState(state,condition,blackList){
return handler = {
	    innerState: state,
		get: function (target,name){
			if (blackList.indexOf(name) == -1){
				if (condition(this.innerState)){
					this.innerState = this.innerState + 1;
					return target[name];
				}
				else {
				var err = new Error('No access state');
     			throw err;
				}
			}
			else{
				return target[name];
			}
		},
		set: function(target,name,val){
 			target[name]=val;
 		}

	}
}

function policyWithState(state){

	this.allow = function (input){
 		this.nameFunction = input;
 		this.allowedOrDeny = true;
 		return this;
 	}
 	
 	this.deny = function(input){
 		this.nameFunction = input;
 		this.allowedOrDeny = false;
 		return this;
 	}

 	this.from = function(input){
 		this.fromValue = input;
 		return this;
 	}

 	this.to = function (input){
 		this.toValue = input;
 		return this;
 	}

 	this.condition = function (input){
 		this.condition = input;
 		return this;
 	}

 	this.install = function(){
 		return new Proxy(this.fromValue,crHandlerState(state,this.condition,this.nameFunction));
 	}



}


/////////////////////////////////////////////////////////////////////

//new Policy()
//.deny(‘spendCoupon’)
//.from(‘bob’)
//.to(‘alice’) .install()
//var p = new Policy().deny('test');
//var p = new Policy();
// var bob = require ('./bob.js');
// //var alice = require('./alice.js');
// var p = new policy().allow('spendCoupon').from(bob).to('alice').install();
// try{
// 	p.spendCoupon(5);
// }
// catch (err){
// 	console.log(err);
// }

// //var bobRuleApplied = bob.allow('execute','spendCoupon','Alice'); 
// //alice.friendList.push(p);
// //alice.friendList[0].spendCoupon(5);


 // var alice = require ('./alice.js');
 // var membranes = require('./membranes.js');

  // var wetTarget = require('./bob.js');
  // var membrane = membranes.makeMembrane(wetTarget);
  // var bob = membrane.target;
   //  var bob = requireClean('./bob.js');
   // //var bob = require('./bob.js');
   // var p = new policy().deny('removeAmount').from(bob).to('alice').install();
   // console.log(p.firstname);
   // console.log(p.firstname = "test");
   // console.log(p.firstname);
  // console.log(bob.amount = 100);
 // var revoke = dryProxy.revoke();
 // console.log(revoke.firstname);
module.exports.policy = policy;
module.exports.policyWithState = policyWithState;
module.exports.requireClean = requireClean;
//module.exports = test;


// create membrane for target, Get proxy from membrane (make sure it is the only communication channel) 