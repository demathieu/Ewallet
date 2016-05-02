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
				this.amount = this.amount - amount;
			},
			removeAmount2 : function(amount){
				this.amount = this.amount - amount;
			},
			removeAmount3 : function(amount,amount2,amount3){
				this.amount = this.amount - amount - amount2 - amount3;
			},
			removeAmountNothing : function(amount){
				console.log('nothing')
			}
};

module.exports = alice;

