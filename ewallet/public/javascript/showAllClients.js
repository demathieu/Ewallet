var socket;

function getServerData(){
	socket = io.connect('http://localhost:8000');
	socket.emit('getAllClients');
	socket.on('result',function(data){
		for (var i = data.length - 1; i >= 0; i--) {
			document.write('client'+ i+ ' : ' + data.ID + data[i].firstName + ' ' + data[i].lastName);
			
			document.write()
			document.write('<br />')
		};
	})
}