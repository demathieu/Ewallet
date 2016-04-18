"use strict";


var alice = {
			firstname:'Jan',
			lastname:'Smith',
			listOfCoupons:[],
			password: 'haha',
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
			login: function(password){
				if (this.password === password){
					return true;
				}else{
					return false;
				}
			},
			loginBad: function(password){
				if (this.password === password){
					return this.password;
				}else{
					return this.password;
				}
			},

			removeAmount : function(amount){
				this.amount = this.amount - amount;
			}
};

module.exports = alice;

