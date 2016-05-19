var socket;
window.onload = function() {
  socket = io.connect('http://localhost:8000');
    document.getElementById('name').value = "";
    document.getElementById('description').value = "";
    document.getElementById('prize').value = "";


};
function check() {
  var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  var name = document.getElementById('name').value;
  var description = document.getElementById('description').value;
  var prize = document.getElementById('prize').value;

  var newItem = {
    name: name,
    description : description,
    prize : prize,
    owner : loggedUser
  };
  socket.emit('itemCreation', newItem);
  socket.on('resultAddItem',function(){
    document.getElementById('name').value = "";
    document.getElementById('description').value = "";
    document.getElementById('prize').value = "";
    document.getElementById('result').innerHTML = "You added a item succesfully";

  });
}
