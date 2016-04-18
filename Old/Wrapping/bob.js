"use strict";

var bob = {
	firstname:'Jan',
	lastName:'Smith',
	listOfCoupons:[{id : 1}],
	friendList:[], 
	spendCoupon : function(amount){
		for (i = 0; i == amount; i++){
			listOfCoupons.shift();
		}
	}

module.exports = bob;