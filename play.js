var _ = require('lodash');
// var test1 = {method: 'removeAmount'};
// var test2 = {method:'createElement', arguments: ['iframe']}


// if(test1.hasOwnProperty("method")){
// 	console.log(true);
// }else{
// 	console.log(false);
// }

// var test = { '0': 10 }
// console.log(test[0]);


// function test (input){
// 	this.deny = function (){
// 		console.log(input);
// 		return this;
// 	}
// }

// test("test").deny();

// function test (input){
// 	console.log(input)
// 	if(input === '{}'){
// 		return true
// 	}else{
// 		return false
// 	}
// }

// console.log(test({}));
// console.log(test());



// var test = { '0': 10, '1': 20 };

// var vals = Object.keys(test).map(function (key) {
//     return test[key];
// });

// console.log(vals);


// var list1 = [ "2","10", "5","7" ]
// var list2 = ["1"]
// var el = 10;
// //console.log(10 == list2[0]) ;

// function isEmpty(obj) {

//     // null and undefined are "empty"
//     if (obj == null) return true;

//     // Assume if it has a length property with a non-zero value
//     // that that property is correct.
//     if (obj.length > 0)    return false;
//     if (obj.length === 0)  return true;

//     // Otherwise, does it have any properties of its own?
//     // Note that this doesn't handle
//     // toString and valueOf enumeration bugs in IE < 9
//     for (var key in obj) {
//         if (hasOwnProperty.call(obj, key)) return false;
//     }

//     return true;
// }

// function contains(list1,compList){
// 	if (typeof compList === 'object'){
// 		if(isEmpty(compList)){
// 			return false;
// 		}
// 		var returnVal = false;
// 		var i = 0;
// 		while(!returnVal && i < list1.length) {
//    	 		if (compList.indexOf(list1[i]) != -1) {
//     	    	returnVal = true
//     		}
//     		i++;
// 		}
// 		return returnVal;
// 	}else{
// 		var returnVal = false;
// 		var i = 0;
// 		while(!returnVal && i < list1.length){
// 			if(list1[i] == compList){
// 				return true;
// 			}
// 			i++;
// 		}
// 		return false
// 	}
// }
// console.log(contains(list1,list2))
// console.log(contains(list1,el))
// console.log(contains(list1, []))

// console.log(contains(list1,{}))

// if (!Array.prototype.find) {
//   Array.prototype.find = function(predicate) {
//     if (this === null) {
//       throw new TypeError('Array.prototype.find called on null or undefined');
//     }
//     if (typeof predicate !== 'function') {
//       throw new TypeError('predicate must be a function');
//     }
//     var list = Object(this);
//     var length = list.length >>> 0;
//     var thisArg = arguments[1];
//     var value;

//     for (var i = 0; i < length; i++) {
//       value = list[i];
//       if (predicate.call(thisArg, value, i, list)) {
//         return value;
//       }
//     }
//     return undefined;
//   };
// }

//  var list1 =  [{method: 'removeAmount',arguments:'test'},{method: 'removeAmount2',arguments: 'test2'}];

// var name = 'removeAmount'
//  console.log(list1.find(function(el){
//  	return el.method === name
//  }))


// var list2 = {method: 'removeAmount'}
// var val = []

// list1.forEach( function(el){
// 	Object.keys(el).forEach(function (key) {
// 		val.push(el[key]);
// 	});
// })

// console.log(val)


// console.log(val)



// function isEmpty(obj) {

//     // null and undefined are "empty"
//     if (obj == null) return true;

//     // Assume if it has a length property with a non-zero value
//     // that that property is correct.
//     if (obj.length > 0)    return false;
//     if (obj.length === 0)  return true;

//     // Otherwise, does it have any properties of its own?
//     // Note that this doesn't handle
//     // toString and valueOf enumeration bugs in IE < 9
//     for (var key in obj) {
//     	if (hasOwnProperty.call(obj, key)) return false;
//     }

//     return true;
// }

// function contains(list1,compList){
// 	if (typeof compList === 'object'){
// 		console.log(compList)
// 		if(isEmpty(compList)){
// 			return false;
// 		}
// 		var returnVal = false;
// 		var i = 0;
// 		while(!returnVal && i < list1.length) {
// 			if (list1[i] === compList[0]) {
// 				returnVal = true
// 			}
// 			i++;
// 		}
// 		return returnVal;
// 	}else{
// 		var returnVal = false;
// 		var i = 0;
// 		while(!returnVal && i < list1.length){
// 			if(list1[i] == compList){
// 				return true;
// 			}
// 			i++;
// 		}
// 		return false
// 	}
// }

// var allowedList = [ [], [], [ 5, 10 ] ]; // [10,5]
// var list = [ 0, 0, 6 ]; 				// [5]

// var allowedListOld = [10,5];
// var listOld = [6];

// function contains2(list1,compList){
// 	if (typeof compList === 'object'){
// 		var returnVal = false;
// 		var i = 0;
// 		var j = 0;
// 		while (!returnVal && i < list1.length){
// 			if(typeof list1[i] ==='object'){
// 				while(!returnVal && j < list1[i].length){
// 					if (list1[i][j]==compList[i]){
// 						returnVal = true;
// 					}else{
// 						returnVal = false;
// 					}
// 					j++;
// 				}
// 			}else{
// 				if(list1[i]==compList[0]){
// 					returnVal = true;
// 				}
// 			}
// 			i++;

// 		}
// 	}
// 	return returnVal
// }

// //console.log(contains([10,5],6))
// console.log(contains2(allowedListOld,listOld))
// console.log(contains2(allowedList,list))
function createExonerateList (signatureMap, name){
	var i = 0;
	var list = [];

	signatureMap.forEach(function(value, key, map){
		if (key == name){
			list.push(value);
		}
	})
	return _.flatten(list); 
}

function convertListToObjects(list){
	var result = [];
	list.forEach(function(el){
		var obj = [];
		obj = [el,0]
		result.push(obj);
	})
	return result;
}

function convertObjectToSignatureMap(list,keyword){
	var result = []
	list.forEach(function(el){
		if (el['traceSignature']){
			el['traceSignature'].unshift(el[keyword]) // add name of triggered function to traceList
			result.push(convertListToObjects(el['traceSignature']))
		}
	})
	return result;
}

var list = [{method: 'removeAmount4',traceSignature:['amount']}]
var list2 = [{method: 'removeAmount4',traceSignature:['amount','amount3']},{method: 'removeAmount5',traceSignature:['amount2']}]

var test = convertObjectToSignatureMap(list2,'method')

function updateMap(list, name){
	list.forEach(function (el){
		if (key(nextExpectedEl(el)) == name){
			passed(nextExpectedEl(el));
			checkSignatureDone(el);
		}
	})
}

updateMap(test,'removeAmount4')
updateMap(test,'removeAmount5')
updateMap(test,'amount');
updateMap(test,'amount3');
console.log(test);
console.log(getExonerateList(test));
function getExonerateList(list){
	var result = [];
	list.forEach(function(el){
		var nextEl = nextExpectedEl(el)
		if(value(nextEl) == 0){
			result.push(key(nextEl))
		}
	})
	return result;
}

function checkSignatureDone(list){
	var done = true;
	list.forEach(function (el){
		if (value(el) != 1){
			done = false;
		}
	})
	if (done){
		list.forEach(function (el){
			el[1] = 0;
		})
	}
}

function passed(el){
	el[1] = 1;
}


function nextExpectedEl(list){
	i = 0;
	while(i < list.length){
		if(value(list[i]) == 0){
			return list[i];
		}
		i++;
	}
}


function key (el){
	return el[0];
}

function value (el){
	return el[1];
}

var temp = [ 'removeAmount4', 'amount', 'amount3' ]


var obj = {'test' : 0}
// console.log(obj.value)

// //console.log(convertListToObjects(temp))

// console.log(test)