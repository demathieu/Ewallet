var socket;


window.onload = function(){
	socket = io.connect('http://localhost:8000');
	socket.on('result', function(data){
 		document.getElementById('clientID').value = "";
 		document.getElementById('couponID').value = "";
 	})
   
};


function check() {
	var clientID = document.getElementById('clientID').value;
	var couponID = document.getElementById('couponID').value;
	var data = {couponID:couponID,clientID:clientID};
	socket.emit('addCouponToClient', data);
}