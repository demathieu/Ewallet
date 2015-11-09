var socket;


window.onload = function(){
	socket = io.connect('http://localhost:8000');
	socket.on('result', function(data){
 		document.getElementById('clientID').value = "";
 		document.getElementById('amountOfCoupons').value = "";
 	})
   
};


function check() {
	var clientID = document.getElementById('clientID').value;
	var amountOfCoupons = document.getElementById('amountOfCoupons').value;
	var data = {amountOfCoupons:amountOfCoupons,clientID:clientID};
	socket.emit('addCouponToClient', data);
}