var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io');

app.use('/', express.static('public'));

io = io.listen(app.listen(8000));
var harmony =require('harmony-reflect');


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


var handler = {
	get: function (target,name){
		console.log('Get request');
		if (name == 'listOfCoupons'){
			console.log('No access');
		}
		else{
			return target[name];
		}	
	}
}



var client1 = {firstname:'Jan',lastName:'Smith',listOfCoupons:[],friendList:[]};
var client2 = {firstname:'Edward',lastName:'Smith',listOfCoupons:[],friendList:[]};

var proxyClient1 = new Proxy(client1,handler);

client1.friendList.push(client2);
client2.friendList.push(proxyClient1);
client1.listOfCoupons.push(coupons[0]);



console.log(client1);
console.log(client2);
console.log(client2.friendList[0].listOfCoupons[0]);
console.log(coupons);


