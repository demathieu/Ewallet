var harmony = require('harmony-reflect');
var Reflect = require('./requirements/reflect.js');
var alice = require('./alice.js');


function handler(state,whiteList) {
	return{
		get : function(target,name,recv){
            var method = Reflect.get(target, name, recv);
			if (typeof method === "function")
			  return function () {
			  	console.log(arguments)
				return Reflect.apply(method, this, arguments);
			  }
			return method;
			
		},
		set: function(target,name,val){
			console.log("set: "+name);
			target[name] = val;
		}
	}

}

var state  = {
   condition: function(name,whiteList){
    return true;
  }
}

aliceSafe = new Proxy(alice,handler(state,'removeAmount'));


console.log(aliceSafe.removeAmount(10))
//console.log(p(10));