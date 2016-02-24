var harmony = require('harmony-reflect');

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

function handler() {
	return handler ={
		get : function(target,name,recv){
			console.log("get: " + name);
			console.log(target.firstname);
			return target[name];

		},
		set: function(target,name,val){
			console.log("set: "+name);
			target[name] = val;
		}
	}

}
console.log(Object.getPrototypeOf(bob));
console.log(bob.__proto__)
console.log(Object.prototype);
var bobP = new Proxy(bob,handler());
bobP.removeAmount(10);

https://zeekat.nl/articles/constructors-considered-mildly-confusing.html