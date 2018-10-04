var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Serve up content from public directory
app.use(express.static(__dirname + '/public'));

http.listen(process.env.PORT || 3000);

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('polyline', function(lineObj) {
        console.log('polyline received');
        socket.broadcast.emit('polyline', lineObj);
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });