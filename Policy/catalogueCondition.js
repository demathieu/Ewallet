var blackListAccesControl = {
   condition: function(name,blackList){
    if(blackList.indexOf(name) == -1){
      return true;
      }else{
        return false;
      }
   }
}

var whiteListAccesControl = {
   condition: function(name,whiteList){
    if(whiteList.indexOf(name) == -1){
      return false;
      }else{
        return true;
      }
   }
}


var accessCounter = {
	 innerstate: 0,
	 condition: function(name,whiteList){
	 	if(whiteList.indexOf(name) == -1){
	 		if (this.innerstate < 1){
	 			this.innerstate = this.innerstate + 1;
	 		return true;
	 		}else{
	 			return false;
	 		}
	 	}else{
	 		return true;
	 	}

	 }
}


module.exports.blackListAccesControl = blackListAccesControl;
module.exports.whiteListAccesControl = whiteListAccesControl;
module.exports.accessCounter = accessCounter;
