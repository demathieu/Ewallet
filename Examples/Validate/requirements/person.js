function person(firstName) {
    this.firstName = firstName;
    this.lastName = 'Smith';
    this.amount = 0;
    function removeAmount(amount){
    	this.amount = this.amount + amount
    }
}


module.exports = person;