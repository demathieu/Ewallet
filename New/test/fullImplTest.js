var assert = require('chai').assert
var alice = require('./../requirements/alice.js');
var bob = require('./../requirements/bob.js');
var helper = require('./../requirements/helper.js');
var policyBuilder = require('./../requirements/policyBuilder');
var chai = require('chai');
var expect = chai.expect;


describe('Complete Test suit', function() {
  describe('Basic Deny tests without state and without whiteList', function() {
    aliceSafe = new policyBuilder.policy({})
      .deny({
        method: 'removeAmount'
      })
      .install(alice)
    it('Test is if basic deny method policy on removeAmount still allows alice.amount', function() {
      alice.amount = 0; //initialize
      assert.equal(0, aliceSafe.amount);
    });
    it('Test is if basic deny method policy on removeAmount works', function() {
      expect(function() {
        aliceSafe.removeAmount(10);
      }).to.throw(Error);
    });
    it('Test is if basic deny method policy on removeAmount allowed correct arguments', function() {
      alice.amount = 0;
      aliceSafe = new policyBuilder.policy()
        .deny({
          method: 'removeAmount',
          arguments: [10, 5]
        })
        .install(alice)
      aliceSafe.removeAmount(0);
      assert.equal(0, aliceSafe.amount)
    });
    it('Test is if basic deny method policy on removeAmount denys wrong arguments', function() {
      expect(function() {
        aliceSafe.removeAmount(10);
      }).to.throw(Error);
    });
    it('Test is if basic propertyUpdate works', function() {
      aliceSafe = new policyBuilder.policy()
        .deny({
          propertyUpdate: 'amount'
        })
        .install(alice);
      expect(function() {
        aliceSafe.amount = 10
      }).to.throw(Error);
    });
    it('Test is if basic propertyUpdate still allows reading like it should', function() {
      aliceSafe = new policyBuilder.policy()
        .deny({
          propertyUpdate: 'amount'
        })
        .install(alice);
      alice.amount = 0;
      assert.equal(0, aliceSafe.amount)

    });
    it('Test is if basic propertyRead deny reading a property', function() {
      aliceSafe = new policyBuilder.policy()
        .deny({
          propertyRead: 'amount'
        })
        .install(alice);
      expect(function() {
        aliceSafe.amount;
      }).to.throw(Error);
    });
    it('Test is if basic propertyRead still allows setting a property like it should', function() {
      aliceSafe = new policyBuilder.policy()
        .deny({
          propertyRead: 'amount'
        })
        .install(alice);
      aliceSafe.amount = 10
      assert.equal(10, alice.amount)

    });
    it('Test is if basic propertyFull deny reading a property', function() {
      aliceSafe = new policyBuilder.policy()
        .deny({
          propertyFull: 'amount'
        })
        .install(alice);
      expect(function() {
        aliceSafe.amount;
      }).to.throw(Error);
    });
    it('Test is if basic propertyFull deny setting of a property', function() {
      expect(function() {
        aliceSafe.amount = 10
      }).to.throw(Error);
    });

  });
  describe('Basic Allow tests without state and without whiteList', function() {

    it('Test is if basic allow method policy on removeAmount still denys alice.amount', function() {
      aliceSafe = new policyBuilder.policy()
        .allow({
          method: 'removeAmount'
        })
        .install(alice)
      expect(function() {
        aliceSafe.amount;
      }).to.throw(Error);
    });
    it('Test is if basic allow method policy on removeAmount denys method because alice.amount is not allowed', function() {
      alice.amount = 0; //initialize
      expect(function() {
        aliceSafe.removeAmount(10);
      }).to.throw(Error);

    });
    it('Test is if basic allow method policy on removeAmountNothing works', function() {
      aliceSafe = new policyBuilder.policy()
        .allow({
          method: 'removeAmountNothing'
        })
        .install(alice)
      alice.amount = 0; //initialize
      aliceSafe.removeAmountNothing(10);
      assert.equal(0, alice.amount)
    });
    it('Test is if basic allow method policy on removeAmount works with traceSignature', function() {
      aliceSafe = new policyBuilder.policy()
        .allow({
          method: 'removeAmount',
          traceSignature: ['amount']
        })
        .install(alice)
      alice.amount = 0; //initialize
      aliceSafe.removeAmount(10);
    });
    it('Test is if basic allow method policy on removeAmount allows correct arguments with traceSignature', function() {
      alice.amount = 0;
      aliceSafe = new policyBuilder.policy()
        .allow({
          method: 'removeAmountNothing',
          arguments: [10, 5],
          traceSignature: ['amount']
        })
        .install(alice)
      aliceSafe.removeAmountNothing(10);
    });
    it('Test is if basic allow method policy on removeAmount denys wrong arguments', function() {
      expect(function() {
        aliceSafe.removeAmount(0);
      }).to.throw(Error);
    });
    it('Test is if basic propertyUpdate works', function() {
      aliceSafe = new policyBuilder.policy()
        .allow({
          propertyUpdate: 'amount'
        })
        .install(alice);
      aliceSafe.amount = 10
      assert.equal(10, alice.amount)
    });
    it('Test is if basic propertyUpdate still blocks reading like it should', function() {
      aliceSafe = new policyBuilder.policy()
        .allow({
          propertyUpdate: 'amount'
        })
        .install(alice);
      expect(function() {
        aliceSafe.amount;
      }).to.throw(Error);
    });
    it('Test is if basic propertyRead allows reading a property', function() {
      aliceSafe = new policyBuilder.policy()
        .allow({
          propertyRead: 'amount'
        })
        .install(alice);
      alice.amount = 0;
      assert.equal(0, aliceSafe.amount);
    });
    it('Test is if basic propertyRead denys setting a property like it should', function() {
      aliceSafe = new policyBuilder.policy()
        .allow({
          propertyRead: 'amount'
        })
        .install(alice);
      expect(function() {
        aliceSafe.amount = 10
      }).to.throw(Error);
    });
    it('Test is if basic propertyFull allows Setting a property', function() {
      aliceSafe = new policyBuilder.policy()
        .allow({
          propertyFull: 'amount'
        })
        .install(alice);
      aliceSafe.amount = 10
    });
    it('Test is if basic propertyFull allows reading a property', function() {
      assert.equal(10, aliceSafe.amount);
    });


  });
  describe('Basic WhiteList tests without state', function() {
    it('Test is if basic deny method works with WhiteList, 1 arg', function() {
      aliceSafe = new policyBuilder.policy()
        .deny({
          method: 'removeAmount',
          whiteList:[10,5]
        })
        .install(alice)
      expect(function() {
        aliceSafe.removeAmount(0);
      }).to.throw(Error);
    });
    it('Test is if basic deny method works with WhiteList, 1 arg', function() {
      aliceSafe = new policyBuilder.policy()
        .deny({
          method: 'removeAmount',
          whiteList:[10,5]
        })
        .install(alice)
      aliceSafe.removeAmount(10);
    });
    it('Test is if basic propertyUpdate with WhiteList allows value , 1 arg', function() {
      aliceSafe = new policyBuilder.policy()
        .deny({
          propertyUpdate: 'amount',
          whiteList:[10,5]
        })
        .install(alice);
      aliceSafe.amount = 10
    });
    it('Test is if basic propertyUpdate with WhiteList blocks wrong value , 1 arg', function() {
      aliceSafe = new policyBuilder.policy()
        .deny({
          propertyUpdate: 'amount',
          whiteList:[10,5]
        })
        .install(alice);
      expect(function() {
        aliceSafe.amount = 2
      }).to.throw(Error);
    });
    it('Test is if basic propertyFull with WhiteList allows value , 1 arg', function() {
      aliceSafe = new policyBuilder.policy()
        .deny({
          propertyFull: 'amount',
          whiteList:[10,5]
        })
        .install(alice);
      aliceSafe.amount = 10
    });
    it('Test is if basic propertyUpdate with WhiteList blocks wrong value , 1 arg', function() {
      aliceSafe = new policyBuilder.policy()
        .deny({
          propertyFull: 'amount',
          whiteList:[10,5]
        })
        .install(alice);
      expect(function() {
        aliceSafe.amount = 2
      }).to.throw(Error);
    });

    it('Test is if basic deny method works with WhiteList, multiple args 1', function() {
      aliceSafe = new policyBuilder.policy({})
        .deny({
          method: 'removeAmount3',
          whiteList: [[0],
          [0],
          [0]]
        })
        .install(alice)
      expect(function() {
        aliceSafe.removeAmount3(3, 0, 0);
      }).to.throw(Error);
    });
    it('Test is if basic deny method works with WhiteList, multiple args 2', function() {
      aliceSafe = new policyBuilder.policy({})
        .deny({
          method: 'removeAmount3',
          whiteList: [[0],
          [0],
          [0]]
        })
        .install(alice)
      expect(function() {
        aliceSafe.removeAmount3(0, 3, 0);
      }).to.throw(Error);
    });
    it('Test is if basic deny method works with WhiteList, multiple args 3', function() {
      aliceSafe = new policyBuilder.policy({})
        .deny({
          method: 'removeAmount3',
          whiteList: [[0],
          [0],
          [0]]
        })
        .install(alice)
      expect(function() {
        aliceSafe.removeAmount3(0, 0, 3);
      }).to.throw(Error);
    });
    it('Test is if basic deny method works with WhiteList, multiple args 4', function() {
      aliceSafe = new policyBuilder.policy()
        .deny({
          method: 'removeAmount3',
          whiteList: [[0],
          [0],
          [0]]
        })
        .install(alice)
      aliceSafe.removeAmount3(0, 0, 0);
    });

  });

  describe('Install on Multiple targets', function() {
    it('Test is if basic deny method works ', function() {
      listTargetsSafe = new policyBuilder.policy({})
        .deny({
          method: 'removeAmount'
        })
        .installOnMultipleTargets([alice, bob])
      expect(function() {
        listTargetsSafe[0].removeAmount(0);
      }).to.throw(Error);
    });
    it('Test is if basic deny method works with WhiteList, 1 arg', function() {
      expect(function() {
        listTargetsSafe[1].removeAmount(0);
      }).to.throw(Error);
    });
  });

  // describe('Basic WhiteList equality tests without state', function() {
  //   it('Test is if basic deny method works with WhiteList, 1 arg', function() {
  //     var equalFunc = function(name, value, allowedList) {
  //       if (helper.contains(allowedList, value)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //     aliceSafe = new policyBuilder.policy({})
  //       .whiteListEqual([10, 5], equalFunc)
  //       .deny({
  //         method: 'removeAmount'
  //       })
  //       .install(alice)
  //     expect(function() {
  //       aliceSafe.removeAmount(0);
  //     }).to.throw(Error);
  //   });
  // });
  describe('Basic state tests', function() {
    it('Test is if basic deny method works with state, states defines removeAmount can only be triggered two times', function() {
      var state = {
        popuptimes: 0,
        filter: function(target, name, value, recv) {
          if (this.popuptimes >= 2) {
            return false;
          } else {
            this.popuptimes++;
            return true;
          }
        }
      }
      aliceSafe = new policyBuilder.policy(state)
        .deny({
          method: 'removeAmount'
        })
        .install(alice);
      aliceSafe.removeAmount(0);
      aliceSafe.removeAmount(0);
      expect(function() {
        aliceSafe.removeAmount(0);
      }).to.throw(Error);
    });
    it('Test is if basic deny method with argument works with state, states defines removeAmount can only be triggered two times', function() {
      var state = {
        popuptimes: 0,
        filter: function(target, name, value, recv, amount) {
          if (this.popuptimes >= amount[0]) {
            return false;
          } else {
            this.popuptimes++;
            return true;
          }
        }
      }
      aliceSafe = new policyBuilder.policy(state)
        .deny({
          method: 'removeAmount',
          arguments: [2]
        })
        .install(alice);
      aliceSafe.removeAmount(0);
      aliceSafe.removeAmount(0);
      expect(function() {
        aliceSafe.removeAmount(0);
      }).to.throw(Error);
    });
    it('Test is if basic deny method with argument works with state, states defines removeAmount can only be triggered two times', function() {
      var state = {
        popuptimes: 0,
        filter: function(target, name, value, recv, amount) {
          if (this.popuptimes >= 2) {
            return false;
          } else {
            this.popuptimes++;
            return true;
          }
        }
      }
      aliceSafe = new policyBuilder.policy(state)
        .deny({
          propertyUpdate: 'amount'
        })
        .install(alice);


      aliceSafe.amount = 10;
      aliceSafe.amount = 10;
      expect(function() {
        aliceSafe.amount = 10;;
      }).to.throw(Error);
    });
    it('Test is if basic deny method with argument works with state, states defines removeAmount can only be triggered two times', function() {
      var state = {
        popuptimes: 0,
        filter: function(target, name, value, recv, amount) {
          if (this.popuptimes >= 2) {
            return false;
          } else {
            this.popuptimes++;
            return true;
          }
        }
      }
      aliceSafe = new policyBuilder.policy(state)
        .deny({
          propertyUpdate: 'amount'
        })
        .install(alice);
      aliceSafe.amount = 10;
      aliceSafe.amount = 10;
      expect(function() {
        aliceSafe.amount = 10;;
      }).to.throw(Error);
    });
    it('Test is if basic deny propertyRead works with state, states defines Amount can only be triggered two times', function() {
      var state = {
        popuptimes: 0,
        filter: function(target, name, value, recv, amount) {
          if (this.popuptimes >= 2) {
            return false;
          } else {
            this.popuptimes++;
            return true;
          }
        }
      }
      aliceSafe = new policyBuilder.policy(state)
        .deny({
          propertyRead: 'amount'
        })
        .install(alice);
      aliceSafe.amount;
      aliceSafe.amount;
      expect(function() {
        aliceSafe.amount;
      }).to.throw(Error);
    });
    it('Test is if basic deny propertyFull works with state, states defines Amount can only be triggered two times', function() {
      var state = {
        popuptimes: 0,
        filter: function(target, name, value, recv, amount) {
          if (this.popuptimes >= 2) {
            return false;
          } else {
            this.popuptimes++;
            return true;
          }
        }
      }
      aliceSafe = new policyBuilder.policy(state)
        .deny({
          propertyFull: 'amount'
        })
        .install(alice);
      aliceSafe.amount;
      aliceSafe.amount;
      expect(function() {
        aliceSafe.amount = 10;
      }).to.throw(Error);
    });
  });

  describe('Basic state tests', function() {
    it('Test combinations 1', function() {
      aliceSafe = new policyBuilder.policy()
        .deny([{propertyUpdate: 'amount'}, {method: 'removeAmount'}])
        .install(alice);
      expect(function() {
        aliceSafe.removeAmount(0);
      }).to.throw(Error);
    });
		it('Test combinations 2', function() {
			aliceSafe = new policyBuilder.policy()
				.deny([{propertyUpdate: 'amount'}, {method: 'removeAmount'},{method: 'removeAmount2'},{method: 'removeAmount3'}])
				.install(alice);
			expect(function() {
				aliceSafe.removeAmount2(0);
			}).to.throw(Error);
		});
		it('Test combinations3', function() {
			aliceSafe = new policyBuilder.policy()
				.deny([{propertyUpdate: 'amount'}, {method: 'removeAmount'},{method: 'removeAmount2'},{method: 'removeAmount3'}])
				.install(alice);
			expect(function() {
				aliceSafe.amount = 10;
			}).to.throw(Error);
		});
		it('Test combinations4', function() {
			aliceSafe = new policyBuilder.policy()
				.deny([{propertyUpdate: 'amount'},{propertyUpdate: 'lastname'}, {method: 'removeAmount'},{method: 'removeAmount2'},{method: 'removeAmount3'}])
				.install(alice);
			expect(function() {
				aliceSafe.amount = 10;
			}).to.throw(Error);
		});
  });

});
