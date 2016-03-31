var policyBuilder = require('./requirements/policyBuilder.js');
var c = require('./requirements/catalogueCondition.js');
var alice = require('./requirements/alice.js');
var Reflect = require('./requirements/reflect.js');
// don't allow Alice password to be returned


var aliceSafe = new policyBuilder.returnPolicy(c.blackListAccesControl).deny('lastname').install(alice);



//console.log(aliceSafe.firstname);
//console.log(aliceSafe.lastname);
//console.log(aliceSafe.getLastname());
console.log(aliceSafe.getObject());

// var bob = {
// 			firstname:'Jan',
// 			lastname:'Smith',
// 			listOfCoupons:[],
// 			amount: 0,
// 			friendList:[], 
// 			stealCoupon : function(index){
// 				return this.friendList[index].listOfCoupons[index];
// 			},
// 			getLastname: function(){
// 				return this.lastname;
// 			},

// 			getObject: function(){
// 				var copy = Object.assign({}, this);
// 				copy.middleName = 'test2';
// 				return test(copy);
// 			},

// 			spendCoupon : function(amount){
// 				for (var i = 0; i == amount; i++){
// 					listOfCoupons.shift();
// 				}
// 			},

// 			removeAmount : function(amount){
// 				this.amount = this.amount - amount;
// 			}
// };



// // console.log(bob.getObject());
// // console.log(bob);

// var obj = { a: 1 };
// //var copy = Object.assign({}, obj);
// var copy = Object.assign({},obj);
// console.log(copy); // { a: 1 }