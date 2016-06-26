var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var sequenceFromPi = ""
var sequenceFromPhone = "[8, 8, 8, 8]"

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
    
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
    
    
  socket.on('sequencePi', function(msg){
      if (sequenceFromPi != msg && msg != "") {
          console.log('sequenceFromPi: ' + msg);
          sequenceFromPi = msg;
      }
  });
    
  socket.on('sequencePhone', function(msg){
      if (sequenceFromPhone != msg && msg != "") {
          console.log('sequenceFromPhone: ' + msg);
          sequenceFromPhone = msg;
      }
  });
    
});

http.listen(port, function(){
  console.log('listening on *:3000');
});

// http://[2620:101:f000:700:c9b8:4484:a65d:df7f]:3000/

setInterval(() => io.emit('sequencePi', sequenceFromPhone), 500);
setInterval(() => io.emit('sequencePhone', sequenceFromPi), 500);