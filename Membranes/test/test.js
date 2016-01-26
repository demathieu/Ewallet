// var assert = require('chai').assert

// var alice = require('../alice.js');
// var option2 = require('../option2.js');
// var chai = require('chai');
// var expect = chai.expect;


// var bob = option2.requireClean('./bob.js');


// describe('wallet', function() {
//   describe('#alice example', function () {
//     it('test if firstname is correct', function () {
//       assert.equal("Jantje",bob.firstname);
//     });
//     it('put amout to 100', function () {
//       bob.amount = 100;
//       assert.equal(100,bob.amount);
//     });
//     it('remove 10 from amount', function () {
//      bob.removeAmount(10)
//       assert.equal(90,bob.amount);
//     });
//   });
//   describe('#bob example without policy', function () {
//     it('test if firstname is correct', function () {
//       assert.equal("Jantje",bob.firstname);
//     });
//     it('put amout to 100', function () {
//       bob.amount = 100;
//       assert.equal(100,bob.amount);
//     });
//     it('remove 10 from amount', function () {
//       bob.removeAmount(10)
//       assert.equal(90,bob.amount);
//     });
//   });
//    describe("#bob example with policy: \n new option2.policy() \n .deny('removeAmount') \n .from(bob) \n .to('alice') \n .install(); \n", function () {
//    	var bob = option2.requireClean('./bob.js');
//    	var bobP = new option2.policy().deny('removeAmount').from(bob).to('alice').install();
//     it('test if firstname is correct', function () {
//       assert.equal("Jantje",bobP.firstname);
//     });
//     it('put amout to 100', function () { 
//       bobP.amount = 100;
//       assert.equal(100,bobP.amount);
//     });
//     it('try to remove 10 from amount but no access exception should be thrown', function () {
//     expect(function(){
//     	bobP.removeAmount(10);
//     }).to.throw(Error);
//     });

//     it('amount of account should stay the same', function () {
//       assert.equal(100,bob.amount);
//     });
//   });
// });