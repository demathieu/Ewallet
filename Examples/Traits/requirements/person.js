function person() {
    this.firstName = 'jane';
    this.lastName = 'Smith';
    this.amount = 0;
    this.removeAmount = function(amount){
    	this.amount = this.amount + amount
    };
    this.createNew = function(){
    	return new person;
    };
}


module.exports = person;