
// Takes a list of names and return true if the name is not in the list
var blackListAccesControl = {
   condition: function(name,blackList){
    if(blackList.indexOf(name) == -1){
      return true;
      }else{
        return false;
      }
   }
}

// Takes a list of names and return false if the name is not in the list
var whiteListAccesControl = {
   condition: function(name,whiteList){
    if(whiteList.indexOf(name) == -1){
      return false;
      }else{
        return true;
      }
   }
}

// StateFull, Counts the amount of time you enter a function element of the whitelist
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

var allowAll = {
   condition: function(name,whiteList){
    return true;
  }
}


module.exports.blackListAccesControl = blackListAccesControl;
module.exports.whiteListAccesControl = whiteListAccesControl;
module.exports.accessCounter = accessCounter;
module.exports.allowAll = allowAll;
