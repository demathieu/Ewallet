"use strict";

var alice = {firstname:'Jan',lastName:'Smith',listOfCoupons:[],friendList:[], stealCoupon : function(index){return this.friendList[index].listOfCoupons[index];}};

module.exports = alice;