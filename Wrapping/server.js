var alice = require('./alice.js')
var bob = require('./bob.js')


console.log(alice.firstname);
alice.friendList.push(bob);

console.log(alice.stealCoupon(0));