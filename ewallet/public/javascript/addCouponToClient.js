var socket;


window.onload = function(){
	socket = io.connect('http://localhost:8000');
	socket.on('result', function(data){
 		
 	})
   
};