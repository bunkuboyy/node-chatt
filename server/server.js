const path = require('path');
const express = require('express');
const SOCKETIO = require('socket.io');
const http = require('http');
const {messageGenerator} = require('./utils/message.js');

const publicpath = path.join(__dirname ,'../public');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
app.use(express.static(publicpath));
var io = SOCKETIO(server);

io.on('connection', (socket) =>{
  console.log('new user connected');

socket.emit('newMessage',messageGenerator('Admin','Welcome to the chat app'));

socket.broadcast.emit('newMessage',messageGenerator('Admin','New userjoined'));

  socket.on('createMessage', (message,callback)=>{
    console.log('Message created',message);
    io.emit('newMessage',messageGenerator(message.from,message.text));
    callback('I m coder');
  })

  socket.on('disconnect',() =>{
    console.log('user disconected');
  });

});

server.listen(port,() =>{
  console.log(`Starting on port ${port}`);
})
