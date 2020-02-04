const path = require('path');
const express = require('express');
const SOCKETIO = require('socket.io');
const http = require('http');

const publicpath = path.join(__dirname ,'../public');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
app.use(express.static(publicpath));
var io = SOCKETIO(server);

io.on('connection', (socket) =>{
  console.log('new user connected');


  socket.on('createMessage', (message)=>{
    console.log('Message created',message);
    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt : new Date().getTime()
    })
  })

  socket.on('disconnect',() =>{
    console.log('user disconected');
  });

});


server.listen(port,() =>{
  console.log(`Starting on port ${port}`);
})
