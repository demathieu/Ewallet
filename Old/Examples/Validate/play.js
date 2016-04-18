var policyBuilder = require('./requirements/policyBuilder.js');
var c = require('./requirements/catalogueCondition.js');
var alice = require('./requirements/alice.js');
var Reflect = require('./requirements/reflect.js');

var Validator = require('schema-validator');

var aliceSchema = {
    type: Object,

    firstname: {
        type: String,
        required: true,
        test: /^Jan$/i
    },

    lastname: {
        type: String,
        required: true
    },

    removeAmount: {
        type: Function,
        required: true
    }
}


var aliceValidator = new Validator(aliceSchema);
//aliceValidator.debug = true;

var result = aliceValidator.check({
    firstname: 'Jan2',
    lastname: 'Smith',
    removeAmount: function() { }
});

console.log(result);