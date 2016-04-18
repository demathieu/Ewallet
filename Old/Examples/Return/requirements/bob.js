"use strict";


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

var bank = {
	name:'test',
	validCheck: function(check){
		check.valid = true;
	}
}

module.exports = bob;
module.exports.bank = bank;