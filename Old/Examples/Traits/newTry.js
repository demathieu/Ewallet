var Trait = require('traits.js');
var alice = require('./requirements/alice.js');
var harmony = require('harmony-reflect');
var Reflect = require('./requirements/reflect.js');

var allowance = Trait({
	//name: Trait.require,
	list: Trait.require,
	deny: function(name){
		if(this.list.indexOf(name) == -1){
		    return true;
		 }
       	else{
       		console.log('error')
       		return false;
       	}

	},
	allow: function(name){
		if(this.list.indexOf(name) == -1){
		    return false;
		 }
       	else{
       		return true;
       	}

	}
});

function handlerBuilder(inputList){
	return Trait.create(Object.prototype,
		Trait.compose(
			allowance,
			Trait({
				list:inputList,
				get: function(target,name,recv){
					if(this.deny(name)){
						return Reflect.get(target,name,recv);
					}	
				}
			})))
}

var test = handlerBuilder();
var aliceSafe = new Proxy (alice,handlerBuilder('removeAmount'));

console.log(test);