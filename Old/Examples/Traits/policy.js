var Trait = require('traits.js');
var alice = require('./requirements/alice.js');
var harmony = require('harmony-reflect');
var Reflect = require('./requirements/reflect.js');

// Alice removeAmount is not allowed

// policy().deny('removeAmount').install(Alice)

// var blackListAccesControl = {
//    condition: function(name,blackList){
//     if(blackList.indexOf(name) == -1){
//       return true;
//       }else{
//         return false;
//       }
//    }
// }

var HandlerTrait = Trait({
  // the trait requires these properties
  //forEach: Trait.required,
  	deniedList: Trait.required,
  	returnHandler : function(deniedList){
  		return {
  		        get : function(target,name,recv){
		        	console.log("get: " + name);
		        	console.log(deniedList);
		        	if(deniedList.indexOf(name) == -1){
		        		return Reflect.get(target, name, recv);
		        	}
		        	else{
		        		console.log('error')
		        		var err = new Error(name +' is not allowed by the proxy' );
						throw err;
		        	}
  		        }
  		}
	}
});

// var HandlerTrait = Trait({
//   // the trait requires these properties
//   	deniedList: Trait.required,
//   	get : function(target,name,recv){
// 		        	console.log("get: " + name);
// 		        	if(this.deniedList.indexOf(name) == -1){
// 		        		return Reflect.get(target, name, recv);
// 		        	}
// 		        	else{
// 		        		console.log('error')
// 		        		var err = new Error(name +' is not allowed by the proxy' );
// 						throw err;
// 		        	}
//   		        }
// });


function makeHandler(inputList){
 return Trait.create(Object.prototype,
    Trait.compose(
      HandlerTrait,
      Trait({
      	//deniedList: inputList,
      })));
}


// policy().install(Alice).deny('removeAmount')

var test = Trait({
	name: Trait.require,
	list: Trait.require,
	deny: function(){
		if(this.list.indexOf(this.name) == -1){
		    return true;
		    Reflect.get(target, name, recv);
		 }
       	else{
       		console.log('error')
       		return false;
       	}

	},
	allow: function(){
		if(this.list.indexOf(this.name) == -1){
		    return false;
		 }
       	else{
       		return true;
       	}

	}
}

var general = Trait({
	state: Trait.require,
	ev
})

function install(){
	return Trait.create(Object.prototype,
		Trait.compose(
			test,
			Trait({
				get: function(target,name,recv){
				if(this.deny()){
					return Reflect.get(target,name,recv);
				}	
				}
			})))
}


function policy(){

}

//var test = makePolicy('removeAmount',alice).install();
console.log(makeHandler('removeAmount').returnHandler())
var test = new Proxy(alice,makeHandler(('removeAmount','indexOf','subject')).returnHandler(['removeAmount','indexOf','subject']));

console.log(test.firstname);
// console.log(test.removeAmount(10));