
var socket;


window.onload = function(){
	socket = io.connect('http://localhost:8000');
	socket.on('result', function(data){
 		document.getElementById('lastname').value = "";
        document.getElementById('firstname').value = "";
 	})
   
};

function check (){
	//welcome.welcomeString = document.getElementById('Input').value;
    //socket.emit('message',welcome);
    var lastName = document.getElementById('lastname').value;
    var firstName = document.getElementById('firstname').value;
    var client = {firstName : firstName , lastName : lastName};
    console.log(client.firstName);
    console.log('hier passeert hij');
    socket.emit('addClient', client);
}











