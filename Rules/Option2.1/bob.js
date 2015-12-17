"use strict";

//new Policy()
//.deny(‘spendCoupon’)
//.from(‘bob’)
//.to(‘alice’) .install()



var bob = {
	firstname:'Jantje',
	lastName:'Smith',
	listOfCoupons:[{id : 1}],
	amount: 0,
	friendList:[], 
	stealCoupon : function(){},
	spendCoupon : function(amount){
		for (var i = 0; i == amount; i++){
			listOfCoupons.shift();
		}
	},
	removeAmount : function(amount){
		this.amount = this.amount - amount;
	}

}

module.exports = bob;