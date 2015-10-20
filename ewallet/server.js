var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io');

app.use('/', express.static('public'));

io = io.listen(app.listen(8000));


var clients = [];



io.on('connection', function(socket){
	console.log('connection');
  socket.on('addClient', function(client){
  	console.log('msg arrives at server');
  	if (client.lastName && client.firstName){
  		clients.push(client);
  		console.log('added new client');
  		console.log(clients);
  		socket.emit('result' , 'done');
  	}
    else{
    	socket.emit('result', 'failed');
    }
  });
});
