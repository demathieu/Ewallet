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

		}
}

var popUp = screen.create('test','text');
console.log(popUp.url)