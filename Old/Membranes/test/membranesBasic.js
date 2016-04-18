var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var membranes = require('../membranes.js');

describe('membranes basic without policies', function() {
    var wetA = {x:1};
    var wetB = {y:wetA};
    var membrane = membranes.makeMembrane(wetB);
    var dryB = membrane.target;
    var dryA = dryB.y;
  describe('#before revoke', function () {
    
    it('wetA !== dryA', function () {
      assert.notEqual(wetA, dryA);
    });
    it('wetB !== dryB', function () {
      assert.notEqual(wetB, dryB);
    });
    it('wetA.x === 1', function () {
      assert.equal(1, wetA.x);
    });
   
   it('dryA.x === 1', function () {
     assert.equal(1, dryA.x);
   });

  });
   describe('#after revoke', function () {
    it('wetA !== dryA after revoke', function () {
      membrane.revoke();
      assert.notEqual(wetA, dryA);
    });
    it('wetB !== dryB after revoke', function () {
      assert.notEqual(wetB, dryB);
    });
    it('wetA.x === 1 after revoke', function () {
      assert.equal(1, wetA.x);
    });
    it('throws revoke error after revoke', function () {
      expect(function(){
     	dryA.x
     }).to.throw(Error);
     }); 
    });
});