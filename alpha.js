var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var val = "default"

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
    
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
    
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
    
    
  socket.on('sequencePi', function(msg){
      if (val != msg) {
          console.log('inValue: ' + msg);
          val = msg;
      }
  });
    
});

http.listen(port, function(){
  console.log('listening on *:3000');
});

// http://[2620:101:f000:700:c9b8:4484:a65d:df7f]:3000/

setInterval(() => io.emit('sequencePi', "Back again: " + val), 50);