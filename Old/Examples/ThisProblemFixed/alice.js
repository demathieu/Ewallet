"use strict";


var alice = {
			firstname:'Jan',
			lastname:'Smith',
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
				console.log('loc: removeAmount');
				console.log(this);
				this.amount = this.amount - amount;
			}
};

module.exports = alice;

