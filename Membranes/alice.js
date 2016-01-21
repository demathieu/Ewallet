"use strict";

// Get name + second functie test to see if he logs both like expected through proxies
// confiment problem (bob, alice , carle)


var alice = {
			firstname:'Jan',
			lastName:'Smith',
			listOfCoupons:[],
			amount: 0,
			friendList:[], 
			stealCoupon : function(index){
				return this.friendList[index].listOfCoupons[index];
			},

			spendCoupon : function(amount){
				for (var i = 0; i == amount; i++){
					listOfCoupons.shift();
				}
			},

			removeAmount : function(amount){
				this.amount = this.amount - amount;
			}
};

module.exports = alice;

/////////////////////////////// main
// var bob = require('./bob.js');
// var option2 = require('./option2.js');
// var membranes = require('./matMembranes.js');

//     var wetTarget = bob;
//     var membrane = membranes.makeMembrane(wetTarget);
//    // console.log(membrane);
//     var dryProxy = membrane.target;
//     console.log(dryProxy.firstname);

// console.log(alice.firstname);

// console.log(alice.amount = 100);

// try {
// 	alice.removeAmount(10);
// } catch (err) {
//     // handle the error safely
//     console.log(err)
// }

// console.log(alice.amount);

// console.log(bob.firstname);

// console.log(bob.amount = 100);

// try {
// 	bob.removeAmount(10);
// } catch (err) {
//     // handle the error safely
//     console.log(err)
// }
// console.log(bob.amount);

// var bobP = new option2.policy().deny('removeAmount').from(bob).to('alice').install();

// console.log(bobP.firstname);

// console.log(bobP.amount = 100);
// try {
// 	bobP.removeAmount(10);
// } catch (err) {
//     // handle the error safely
//     console.log(err)
// }

// console.log(bobP.amount);
