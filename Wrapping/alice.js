
var alice = {
			firstname:'Jan',
			lastName:'Smith',
			listOfCoupons:[],
			friendList:[],
			stealCoupon : function(index){
				return this.friendList[index].listOfCoupons[index];
			},

			spendCoupon : function(amount){
				for (i = 0; i == amount; i++){
					listOfCoupons.shift();
				}
			}
};

module.exports = alice;
