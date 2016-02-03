// test scenario:: We create an membrane of bob. Someones uses bob by sending it as a parameter. We call revoke in a different method after this 
//call bob should not be able to be accessed


var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var membranes = require('../membranes.js');
var alice = require('../alice.js');
var option2 = require('../option2.js');
var bob = require('../bob.js');

var membrane = membranes.makeMembrane(bob);
var dryBob = membrane.target;

var bank = {
	removeOneFromAccount : function(person){
		person.removeAmount(1);
	}
}

var bankHandler = {
	person : '',
	amount : 0,
	removeOneFromAccount : function(){
		 this.person.removeAmount(1);
	}
}

describe('We give a bob object to the bank, or bankHandler. We prove that we can succesfully revoke bob after he is given away.', function() {
  describe('Before revoke', function () {
    it('test if dry object from membrane, returns the correct firstname', function () {
      assert.equal("Jantje",dryBob.firstname);
    });

    it('put amount of dry object to 100', function () {
      dryBob.amount = 100;
      assert.equal(100,dryBob.amount);
    });

    it('check if wet object is also changed', function () {
      assert.equal(100,bob.amount);
    });

    it('feed dry object to the bank to decrement one from its amount', function () {
      bank.removeOneFromAccount(dryBob);
      assert.equal(99,dryBob.amount);
    });

    it('check if the wet object also has been decremented', function () {
      assert.equal(99,bob.amount);
    });

    it('feed dry object to the bankHandler to decrement one from its amount', function () {
      bankHandler.person = dryBob;
      bankHandler.removeOneFromAccount();
      assert.equal(98,dryBob.amount);
    });

    it('check if the wet object also has been decremented', function () {
      assert.equal(98,bob.amount);
    });


   });

    describe('After revoke', function () {
    it('after the revoke we are not able to access the firstname parameter of the dryobject', function () {
      membrane.revoke();
      expect(function(){
      	dryBob.firstname
     }).to.throw(Error);
    });

    it('although we can acces it in the wetObject', function () {
      assert.equal("Jantje",bob.firstname);
    });

    it('the bank is not able to decrement one of the dry Bob ', function () {
      expect(function(){
      	bank.removeOneFromAccount(dryBob);
     }).to.throw(Error);
    });

    it('the bankHandler is not able to decrement one of the dry Bob ', function () {
      expect(function(){
      	bankHandler.person = dryBob;
        bankHandler.removeOneFromAccount();
     }).to.throw(Error);
    });

    it('Check to make sure the amount has not be changed by the bank', function () {
      assert.equal(98,bob.amount);
    });
   });
 });




