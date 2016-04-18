"use strict";

//new Policy()
//.deny(‘spendCoupon’)
//.from(‘bob’)
//.to(‘alice’) .install()



var bob = {
	firstname:'Jan',
	lastName:'Smith',
	listOfCoupons:[{id : 1}],
	friendList:[], 
	stealCoupon : function(){},
	spendCoupon : function(amount){
		for (var i = 0; i == amount; i++){
			listOfCoupons.shift();
		}
	},
}

module.exports = bob;