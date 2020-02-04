
var socket = io();

socket.on('connect',() =>{
  console.log('Connected to server');

  socket.emit('createMessage',{
    from : 'tushu@gmail.com',
    text : 'heelo tushu'
  });
});

socket.on('disconnect',() =>{
  console.log('Disconnected from server');
});

socket.on('newMessage', (mail)=>{
  console.log('Newmessage',mail);
})
