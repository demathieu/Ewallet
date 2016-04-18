
var alice = {
			firstname:'Jan',
			lastname:'Smith',
			amount: 0,
			friendList:[], 
			removeAmount : function(amount){
				this.amount = this.amount - amount;
			}
};


var aliceWildCard = {
			firstname: *,
			lastname:*,
			*,
			removeAmount : function(amount){
				this.amount = this.amount - amount;
			}
};


// Alice should be equal to 



function equal(obj , wildCard){
	if (obj === wildCard){
		return true;
	}else {
		return false;
	}
}

console.log(equal(alice, alice2))