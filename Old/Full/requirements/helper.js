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


module.exports.member = member;
module.exports.intersectLists = intersectLists;