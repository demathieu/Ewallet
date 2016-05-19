var socket;

window.onload = function() {
  socket = io.connect('http://localhost:8000');
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
};

function check() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var loginCredentials = {
    username: username,
    password: password
  };
  console.log(loginCredentials);
  socket.emit('loginAttempt', loginCredentials);
  socket.on('resultLogged', function(data) {

    localStorage.setItem('loggedUser', JSON.stringify(data));
    
    window.location = "logged.html";
  })
}
