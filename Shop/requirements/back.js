// function policy(inputState){
// 	this.state = inputState; 
// 	this.deny = function(denyObjectList){
// 		var err = new Error( 'is not allowed by the proxy' );
// 		if (denyObjectList.constructor == Array){
// 			console.log("do i come here")
// 			var denyObject = denyObjectList[0];
// 			if (denyObject.hasOwnProperty('method')) {
// 				this.handler = {
// 					get:function(target,name,recv){
// 						console.log("get: " + name);
// 						var method = Reflect.get(target, name, recv);
// 						console.log(denyObjectList)
// 						var properties = getAllProp(denyObjectList);
// 						if (helper.contains(properties,name)){
//  							//if (name === denyObject['method']){
//  								return function () {
//  										this.state = cleanState(state,defaultStateMethodArg);		 // moet state blijven anders kan whitelist het niet overschrijven								
//  										var correctObject = denyObjectList.find(function(el){
//  											return el.method === name
//  										})
//  										if (this.state.filter(target,name,arguments,recv,correctObject['arguments'])){
//  											return Reflect.apply(method, this, arguments);
//  										}else{
//  											throw err;
//  										}
//  									}
//  								}
//  								else{
//  									return method;
//  								}
//  							}
//  						}
//  					} 
//  					return this;
//  				}else{
//  					console.log("I shouldn't be here")
//  					var denyObject = denyObjectList;
// 	 	var state = this.state;			 // moet state blijven anders kan whitelist het niet overschrijven
// 	 	var err = new Error( 'is not allowed by the proxy' );
// 	 	if (denyObject.hasOwnProperty('method')) {
// 	 		this.handler = {
// 	 			get:function(target,name,recv){
// 	 				console.log("get: " + name);
// 	 				var method = Reflect.get(target, name, recv);
// 	 				if (name === denyObject['method']){
// 	 					return function () {
//  										this.state = cleanState(state,defaultStateMethodArg);		 // moet state blijven anders kan whitelist het niet overschrijven								
//  										if (this.state.filter(target,name,arguments,recv,denyObject['arguments'])){
//  											return Reflect.apply(method, this, arguments);
//  										}else{
//  											throw err;
//  										}
//  									}
//  								}else{
//  									return method;
//  								}
//  							}
//  						}
//  					}else if(denyObject.hasOwnProperty('propertyUpdate')){
//  						var state = this.state;
//         			//console.log(state)
//         			this.handler = {
//         				set:function(target,name,value,recv){
//         					console.log("set: " +name);
//         					if(denyObject['propertyUpdate'] === name){
//         						this.state = cleanState(state,defaultWhiteList); // moet state blijven anders kan whitelist het niet overschrijven
//         						if (this.state.filter(target,name,value,recv)){
//         							Reflect.set(target,name,value,recv);
//         						}else{
//         							throw err;
//         						}
//         					}
//         					Reflect.set(target,name,value,recv);
//         				}
//         			}
//         		}
//         		return this;
//         	}
//         }

//         this.whiteList = function(allowedList){
//         	this.state = { 
//         		filter : function(target,name,value,receiver){
// 	 			// console.log(allowedList)
// 	 			// console.log(value)
// 	 			// console.log(value.constructor == Object)
// 	 			if (value.constructor == Object){
// 	 				var val = []
// 	 				Object.keys(value).forEach(function (key) {
// 	 					val = value[key];
// 	 				});
// 	 				return helper.contains(allowedList,val)
// 	 			}
// 	 			return helper.contains(allowedList,value)
// 	 		}
// 	 	}
// 	 	return this;
// 	 }

// 	 this.install = function(target){
// 	 	return new Proxy(target,this.handler);
// 	 }

// 	 this.installOnMultipleTargets = function(listOfTargets){
// 	 	var listOfProxy = [];
// 	 	for(target in listOfTargets){
// 	 		var temp = new Proxy(listOfTargets[target],this.handler);
// 	 		listOfProxy.push(temp);
// 	 	}
// 	 	return listOfProxy;
// 	 }
// 	}