"use strict";


var bob = {
	firstname:'Jantje',
	lastName:'Smith',
	email:'jantjesmith@mail.com',
	phonenumber: '055488686',
	amount: 0,
	trustedList:[],
	addUserToTrustedList: function(newUser){
		this.trustedList.push(newUser);
	},
	removeAmount : function(amount){
		this.amount = this.amount - amount;
	},

}


module.exports = bob;
