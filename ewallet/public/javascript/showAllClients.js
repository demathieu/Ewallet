var socket;

function getServerData(){
	socket = io.connect('http://localhost:8000');
	socket.emit('getAllClients');
	socket.on('result',function(data){
		for (var i = 0; i <= data.length - 1; i++) {
			document.write('client'+ i+ ' : ' + data[i].ID+' ' + data[i].firstName + ' ' + data[i].lastName +' <br /><b>coupons id</b>: ');
			for (var j = 0; j <= data[i].listOfCoupons.length - 1; j++)
			{
				document.write(data[i].listOfCoupons[j].id + ' ');
			}
			document.write('<br />');
			document.write('<br />');
		};
		document.write('<br />');
		document.write('<a href="http://localhost:8000">Go Back</a>');
	})
}