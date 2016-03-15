//Check if there are not more than 2 pop ups at all time
// check that the url is in a whitelist



var policyBuilder = require('./requirements/policyBuilder.js');

var screen = {
	listOfPopUps : [],
	create: function(url,locationbar){
		var popup = {	
						url:url, 
						locationbar:locationbar
					}
		this.listOfPopUps.push(popup);
		return popup;

		},
	delete: function(){
		this.listOfPopUps.pop();
	}
}

var state = {
	 innerstate: 0,
	 condition: function(name,allowedFunctionList,arguments){
	 	var whiteList = ['test'];
	 	if(name == 'create' && this.innerstate < 2){
	 		if(whiteList.indexOf(arguments[0]) != -1){
	 			this.innerstate = this.innerstate + 1;
	 			return true;
	 		}
	 		return false;
	 	}
	 	else if (name == 'create'){
	 		 return false;

	 	}
	 	else if (name == 'delete'){
	 		this.innerstate = this.innerstate - 1;
	 		return true;
	 	}

	 	else { return true;

	 	}
	 }
}


var screenSafe = new policyBuilder.policy(state).allow(['create','delete','listOfPopUps']).install(screen);
  screenSafe.create('test','text');
  //screenSafe.create('test','text');
 // var test = screenSafe.create;
  //test('test','text');
//  screenSafe.delete();
// //  console.log(screenSafe.listOfPopUps);


