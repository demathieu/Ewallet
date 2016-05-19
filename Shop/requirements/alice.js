"use strict";


var alice = {
			firstname:'Jan',
			lastname:'Smith',
			email:'jansmith@mail.com',
			phonenumber: '0454656',
			amount: 0,
			trustedList:[],
			addUserToTrustedList: function(newUser){
				this.trustedList.push(newUser);
			},
			removeAmount : function(amount){
				this.amount = this.amount - amount;
			},
};

module.exports = alice;
