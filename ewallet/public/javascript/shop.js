var socket;


window.onload = function(){
	socket = io.connect('http://localhost:8000');
	socket.on('result', function(data){
 		document.getElementById('userID').value = "";
 		document.getElementById('amountOfCoupons').value = "";
 	})
   
};

function check (){
    var amountOfCoupons = document.getElementById('amountOfCoupons').value;
    var userID = document.getElementById('userID').value;
    console.log('client '+userID + ' spent ' + amountOfCoupons + ' coupons');
    data = {userID:userID,amountOfCoupons:amountOfCoupons};
    socket.emit('shop', data);
}