var harmony = require('harmony-reflect');


var handler = {
	get: function(target,name,recv){
		console.log(name);
		console.log(target);
	}
}

var test = "test1";

function test(){
	return "test2";
}

//var varProxy = new Proxy(test,handler)


console.log(test());