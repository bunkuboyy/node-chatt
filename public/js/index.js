
var socket = io();

socket.on('connect',() =>{
  console.log('Connected to server');

  });

socket.on('disconnect',() =>{
  console.log('Disconnected from server');
});

socket.on('newMessage', (mail)=>{
  console.log('Newmessage',mail);
  var li = jQuery('<li></li>');
  li.text(`${mail.from}: ${mail.text}`);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',(e) =>{
  e.preventDefault();

  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  },() =>{

  })
})
