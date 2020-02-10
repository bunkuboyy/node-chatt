
var socket = io();

socket.on('connect',() =>{
  console.log('Connected to server');

  });

socket.on('disconnect',() =>{
  console.log('Disconnected from server');
});

socket.on('newMessage', (mail)=>{
  var formattedTime = moment(mail.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${mail.from} ${formattedTime}: ${mail.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage',(message) =>{
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: ${formattedTime}`);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit',(e) =>{
  e.preventDefault();
  var messageBox = jQuery('[name=message]');
  socket.emit('createMessage',{
    from:'User',
    text:messageBox.val()
  },() =>{
    messageBox.val('')
  })
})

var locationButton = jQuery('#send-location');
locationButton.on('click',() =>{
  if(!navigator.geolocation){
    return alert('geolocation not supported by browser');
  }

  locationButton.attr('disabled','disabled').text('Sending location....');


  navigator.geolocation.getCurrentPosition((position) =>{
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    })
  }, () =>{
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  })
})
