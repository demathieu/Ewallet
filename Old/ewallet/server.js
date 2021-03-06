var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io');

app.use('/', express.static('public'));

io = io.listen(app.listen(8000));


var clients = [];

var coupons = [
	{id : 1},
	{id : 2},
	{id : 3},
	{id : 4},
	{id : 5},
	{id : 6},
	{id : 7},
	{id : 8},
	{id : 9},
	{id : 10}
];

function findClientOnID(id){
	var i = 0;
	while (i < clients.length){
			if (clients[i].ID == id){
				return clients[i];
			}
			i++;
	}
	throw 'Id is not found in the list of clients';
}

function findCouponOnID(id){
	var i = 0;
	console.log(id);
	while (i < coupons.length){
			console.log(coupons[i].id);
			if (coupons[i].id == id){
				return coupons[i];
			}
			i++;
	}
	console.log('Id is not found in the list of coupons'); 
}

function removeCouponsFromUser(client,numberOfCoupons){
	for (i = 0; i < numberOfCoupons; i++){
		coupons.push(client.listOfCoupons.pop());
	}
}

function addCouponsToUser(client,numberOfCoupons){
	console.log('checkt hier is::::::');
	console.log(numberOfCoupons);

	for(i = 0; i < numberOfCoupons; i++){
		client.listOfCoupons.push(coupons.pop());
		console.log("hier");
	}
	console.log(client);
}

io.on('connection', function(socket){
	console.log('connection');
	socket.on('addClient', function(client){
  		console.log('msg arrives at server');
  		if (client.lastName && client.firstName){
  			client["ID"] = clients.length + 1;
  			clients.push(client);
  			console.log('added new client');
  			console.log(clients);
  			socket.emit('result' , 'done');
  		}
    	else{
    		socket.emit('result', 'failed');
    	}
  });
	socket.on('addCouponToClient', function(data){
		console.log('msg arrives at server for coupon');
		if(data.clientID && data.amountOfCoupons){
			console.log('vars zijn geladen');
			client = findClientOnID(data.clientID);
			console.log('hij vindt de client');
			addCouponsToUser(client,data.amountOfCoupons);
			console.log('added coupon to the list')
			console.log(clients);
			socket.emit('result' , 'done');
  		}
    	else{
    		socket.emit('result', 'failed');
    	}
	});

	socket.on('getAllClients', function(){
		console.log('msg arrives at server for getting all clients');
		socket.emit('result' , clients);
		console.log('all data is collected');
	});	

	socket.on('shop', function(data){
		console.log('entered the shop on server');
		if (data.userID && data.amountOfCoupons){
			client = findClientOnID(data.userID);
			removeCouponsFromUser(client,data.amountOfCoupons);
			socket.emit('result','done');
			console.log('thing is sold and coupons are changed from owner');
		}
		else{
			console.log('something went wrong in the shop');
			socket.emit('result', 'failure');
		}
	});

});
