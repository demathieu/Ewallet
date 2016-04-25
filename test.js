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


var list1 = [ "2","10", "5","7" ]
var list2 = ["1"]
var el = 10;
//console.log(10 == list2[0]) ;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

function contains(list1,compList){
	if (typeof compList === 'object'){
		if(isEmpty(compList)){
			return false;
		}
		var returnVal = false;
		var i = 0;
		while(!returnVal && i < list1.length) {
   	 		if (compList.indexOf(list1[i]) != -1) {
    	    	returnVal = true
    		}
    		i++;
		}
		return returnVal;
	}else{
		var returnVal = false;
		var i = 0;
		while(!returnVal && i < list1.length){
			if(list1[i] == compList){
				return true;
			}
			i++;
		}
		return false
	}
}
console.log(contains(list1,list2))
console.log(contains(list1,el))
console.log(contains(list1, []))

console.log(contains(list1,{}))