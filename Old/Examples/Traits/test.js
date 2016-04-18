
var string = 'allow';
function test(){
	return{
		deny: function(){
			console.log('deny');
		},
		allow: function(){
			this.deny();
			console.log(string);
		}
	}
}

//console.log(deny());
console.log(test.allow());