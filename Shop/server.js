var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io');
var alice = require('./requirements/alice.js');
var bob = require('./requirements/bob.js');
app.use('/', express.static('public'));

io = io.listen(app.listen(8000));

var knownUsers = [];
knownUsers.push(alice);
knownUsers.push(bob);

var itemsToSell = [{ name: 'sdfsdf',
    description: 'sdfsdf',
    prize: 'sdfsdf',
    owner: 'Hef' }];
var handler = {
  get: function(target, name, recv) {
    //console.log("get: " + name)
    return Reflect.get(target, name, recv);

  }
}


function converTokenToUser(token) {
  var found = false;
  var i = 0;
  resultUser = {};
  while (!found && i < knownUsers.length) {
    if (token === knownUsers[i].firstname) {
      resultUser = knownUsers[i];
      found = true;
    }
    i++;
  }
  return resultUser;
}

io.on('connection', function(socket) {
  console.log('connection');
  socket.on('loginAttempt', function(loginCredentials) {
    console.log('loginAttempt')
    var i = 0;
    var logged = false;
    var result = {};
    while (!logged && i < knownUsers.length) {
      console.log(knownUsers[i].firstname)
      if (knownUsers[i].firstname === loginCredentials.username && knownUsers[i].lastname === loginCredentials.password) {
        logged = true;
        resultToken = knownUsers[i].firstname;
      }
      i++;
    }
    socket.emit('resultLogged', resultToken);
  });
  socket.on('itemCreation', function(newItem) {
    console.log('addItem');
    itemsToSell.push(newItem);
    console.log(newItem);
    socket.emit('resultAddItem')
  });

  socket.on('getAllItems', function(user) {
    function noOwnItems(item){
      if(item.owner !== user){
        return item
      }
    }
    result = itemsToSell.filter(noOwnItems);
    console.log(itemsToSell);
    socket.emit('allItems',result)

  })
});
