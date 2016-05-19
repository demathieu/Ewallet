var socket;
window.onload = function() {
  socket = io.connect('http://localhost:8000');
  var loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  socket.emit('getAllItems', loggedUser);
  socket.on('allItems', function(items) {
    items.forEach(function(item) {
      var table = document.getElementById("itemTable");
      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = item.name;
      cell2.innerHTML = item.description;
      cell3.innerHTML = item.prize;
      var inputElement = document.createElement('button');
      inputElement.innerHTML = 'testsdf';
      //  inputElement.onclick = "check("+item.name+")";
      inputElement.onclick = function(){check(item.name)};
      //inputElement.onclick = function(){console.log("test1")};
      cell4.appendChild(inputElement);
    });
  });

};

function check(name) {
  console.log(name);
}
