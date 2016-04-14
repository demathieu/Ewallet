var Trait = require('traits.js');
var alice = require('./requirements/alice.js');
var harmony = require('harmony-reflect');
var Reflect = require('./requirements/reflect.js');

var policy = Trait({ 
	state: Trait.required,
	buildHandler: Trait.required,

})

//policy().deny('removeAmount').install(Alice)

//policy().deny('removeAmount').after('lastname').install(Alice)
function DenyOrAllow(){
	return Trait.create(Object.prototype,
		Trait.compose(
			//policy,
			Trait({
				deny: function(name,list){
					if(list.indexOf(name) == -1){
		    			return true;
		 			}
       				else{
       					console.log('error')
       					return false;
       				}
       			},

				allow: function(name,list){
					if(list.indexOf(name) == -1){
		    			return false;
		 			}
       				else{
       					return true;
       				}
				},
				buildHandler: function(list){
					return {
						get: function(target,name,recv){
							if (deny(name,list)){
								return Reflect.get(target,name,recv);
							}else{
								console.log('error')
		        				var err = new Error(name +' is not allowed by the proxy' );
								throw err;
							}
						}
					}

				}
			})))
}

var output = DenyOrAllow().buildHandler('removeAmount').get();
console.log(output);