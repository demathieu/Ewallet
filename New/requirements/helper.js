function intersectLists(list1, list2){
	var ret = [];
	for (var i = 0; i < list1.length; i++) {
		if (list2.indexOf(list1[i]) !== -1) {
			ret.push(i);
		}
	}
	return ret;
}


function member(elm, list){
	if (list.indexOf(elm) != -1 ){
		return true;
	}
	return false;
}


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

function containsMultiList(list1,compList){
	if (typeof compList === 'object'){
		var returnVal = false;
		var i = 0;
		var j = 0;
		while (!returnVal && i < list1.length){
			if(typeof list1[i] ==='object'){
				while(!returnVal && j < list1[i].length){
					if (list1[i][j]==compList[i]){
						returnVal = true;
					}else{
						returnVal = false;
					}
					j++;
				}
			}else{
				if(list1[i]==compList[0]){
					returnVal = true;
				}
			}
			i++;

		}
	}
	return returnVal
}
module.exports.isEmpty = isEmpty;
module.exports.contains= contains;
module.exports.containsMultiList = containsMultiList;
module.exports.member = member;
module.exports.intersectLists = intersectLists;