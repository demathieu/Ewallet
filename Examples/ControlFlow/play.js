var policyBuilder = require('./requirements/policyBuilder.js');
var alice = require('./requirements/alice.js')
var Reflect = require('./requirements/reflect.js');
var person = require('./requirements/person.js');


// Deny access to removeAmount if the lastname is checked before it

function intersectLists(list1, list2){
	var ret = [];
	for (var i = 0; i < list1.length; i++) {
    	if (list2.indexOf(list1[i]) !== -1) {
        	ret.push(i);
    	}
	}
	return ret;
}

var state = {
	previousAccessList : [],
	sensitiveResourcesList :['lastname'],
	 condition: function(name,appliedFunctionList,arguments){
	 	if(name === 'removeAmount' && intersectLists(this.previousAccessList,this.sensitiveResourcesList).length != 0){
	 		console.log(intersectLists(this.previousAccessList,this.sensitiveResourcesList))
	 		return false;
	 	}
	 	this.previousAccessList.push('lastname');
	 	return true;

	
	}
}




// need to add a parameter to my policy to be able to say, deny access after this or this happends

aliceSafe = new policyBuilder.policy(state).deny('removeAmount').install(alice);

aliceSafe.removeAmount(10);
aliceSafe.lastname;
//aliceSafe.removeAmount(10);


