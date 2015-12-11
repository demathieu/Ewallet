"use strict";
//bob.allow(execute,’GiveMoney’,Alice)


var bob = {
	firstname:'Jan',
	lastName:'Smith',
	listOfCoupons:[{id : 1}],
	friendList:[], 
	stealCoupon : function(){},
	spendCoupon : function(amount){
		for (i = 0; i == amount; i++){
			listOfCoupons.shift();
		}
	},
	//allow : function(t1,t2,t3){}
}

module.exports = bob;