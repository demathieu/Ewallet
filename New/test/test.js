var assert = require('chai').assert
var alice = require('./../requirements/alice.js');
var policyBuilder = require('./../requirements/policyBuilder');
var chai = require('chai');
var expect = chai.expect;

windowSafe = new policyBuilder.policy({})
							  .deny({method: 'removeAmount'})
							  .install(alice);

var state = {
	 popuptimes : 0,
	 // the parameters correspond to the ones in handler.set 
	 filter: function(target,name,recv){  
	 	if(this.popuptimes >= 2){
	 		return false;
	 	} else {
			this.popuptimes++;
			return true;
		}
	}
}
windowSafe2 = new policyBuilder.policy(state)
							  .deny({method: 'removeAmount'})
							  .install(alice);

describe('Complete Test suit', function() {
	describe('Deny access to removeAmount', function () {
		it('test if removeAmount works on Alice', function () {
			alice.removeAmount(10);
      		assert.equal("-10",alice.amount);
      	});
    	it('Deny access to removeAmount of alice without given a state', function () {	
      		expect(function(){
    			windowSafe.removeAmount(10);
    		}).to.throw(Error);
    	});
    });
    describe('Deny access to removeAmount after it got accessed a second time, we use a state for this', function(){
    	it('Check that the first two access to removeAmount are allowed', function () {
    		windowSafe2.amount = 0;	
      		windowSafe2.removeAmount(10);
      		windowSafe2.removeAmount(10);
      		assert.equal("-20",windowSafe2.amount);
    	});
    	it('Thrid access is denied', function () {	
      		expect(function(){
    			windowSafe2.removeAmount(10);
    		}).to.throw(Error);
    	});
    });

    describe('POL 4: Method with argument', function (){
    	it('without state, argument is allowed',function (){

		locationSafe = new policyBuilder.policy({})
								.deny({method:'removeAmount', arguments: ['10']})
								.install(alice);
		locationSafe.amount = 0;
		locationSafe.removeAmount(5);
		assert.equal("-5",locationSafe.amount);
    	});
    	it('without state, argument is not allowed',function(){
    		expect(function(){
    			locationSafe.removeAmount(10)}).to.throw(Error);
    		})
    });
var state = {
	 // the parameters correspond to the ones in handler.set 
	 filter: function(target,name,arguments,recv,condition){
	 	if (arguments[0] == condition[0]){
	 		return false;
	 	}else{
	 		return true;
	 	}
	 }

}
    describe('POL 4: Method with argument', function (){
    	it('with state, argument is allowed',function (){

		locationSafe2 = new policyBuilder.policy(state)
								.deny({method:'removeAmount', arguments: ['10']})
								.install(alice);
		locationSafe2.amount = 0;
		locationSafe2.removeAmount(5);
		assert.equal("-5",locationSafe.amount);
    	});
    	it('with state, argument is not allowed',function(){
    		expect(function(){
    			locationSafe2.removeAmount(10)}).to.throw(Error);
    		})
    });


    describe('POL 5 using whitelist ', function(){
    	it('should be denied because it isnt in the white list', function (){
    		leakageSafe = new policyBuilder.policy({})
								.whiteList([10])
								.deny({propertyUpdate:'amount'})				
								.install(alice);
		  expect(function(){
		  	leakageSafe.amount = 5;
		  }).to.throw(Error);
    	});
    	it('Should be allowed because it is in the whitelist',function () {
    		leakageSafe.amount = 10;
    		assert.equal("10",leakageSafe.amount);
    	})

    })


});