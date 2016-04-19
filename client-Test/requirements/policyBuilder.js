var harmony = require('harmony-reflect');
var Reflect = require('./reflect.js');

function policy(state){
	 this.deny = function(denyObject){
	 	for (var property in denyObject) {
    		if (denyObject.hasOwnProperty(property)) {
        		if(property === 'method'){
        			this.handler = {
        				get:function(target,name,recv){
        					console.log("get: " + name);
 							var method = Reflect.get(target, name, recv);
 							if (name === denyObject[property]){
 								 if (state.filter()){
 									return method;
 								}else{
 									console.log(name);
 									var err = new Error( 'is not allowed by the proxy' );
					 				throw err;
 								}
 							}else{
 								return method;
 							}

        				}

        			}

        		}else if(property === 'propertyUpdate'){

        			console.log('TODO')

        		}else if (property === 'arguments'){
        			console.log('TODO')
        		}
    		}
		}
		return this;
	 }

	 this.install = function(target){
	 	return new Proxy(target,this.handler);
	 }
}

var handler = {
    get:function(target,name,recv){
        console.log("get: " + name);
        return Reflect.get(target,name,recv);
    },
    set: function(target, property, value, receiver){
        console.log("set: " + property);
        return Reflect.set(target, property, value, receiver);
    }

}

function logger(target){
    return new Proxy (target,handler);
}




//module.exports.policy = policy;
//module.exports.logger = logger;

window.policy = policy;
window.logger=logger;
