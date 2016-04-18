var chai = require('chai');
var assert = chai.assert;
var alice = require('../alice.js');
var option2 = require('../option2.js');

var bobN = require('../bob.js');
var bobP = new option2.policy().deny('removeAmount').from(bobN).to('alice').install();
var bobM = option2.requireClean('./bob.js');
var bobPM = new option2.policy().deny('removeAmount').from(bobM).to('alice').install();

describe('wallet', function() {
  describe('No Proxy', function () {
    it('test if firstname is correct', function () {
      assert.equal("Jantje",bobN.firstname);
    });
    it('test if amount works', function () {
	  bobN.amount = 100;
	  assert.equal(100,bobN.amount);
	});
  });
  describe('Proxy with policy NO membrane', function () {
    it('test if firstname is correct', function () {
      assert.equal("Jantje",bobP.firstname);
    });
    it('test if amount works', function () {
	  bobP.amount = 100;
	  assert.equal(100,bobP.amount);
	});
  });

    describe('Proxy NO policy With membrane', function () {
    it('test if firstname is correct', function () {
      assert.equal("Jantje",bobM.firstname);
    });
    it('test if amount works', function () {
	  bobM.amount = 100;
	  assert.equal(100,bobM.amount);
	});
  });

    describe('Proxy with policy With membrane', function () {
    it('test if firstname is correct', function () {
      assert.equal("Jantje",bobPM.firstname);
    });
    it('test if amount works', function () {
	  bobPM.amount = 100;
	  assert.equal(100,bobPM.amount);
	});
  });
 });