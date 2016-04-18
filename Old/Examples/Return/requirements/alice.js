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
			getLastname: function(){
				return this.lastname;
			},

			getObject: function(){
				var thismod = this;
				thismod.middleName = 'test';
				return thismod;
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

