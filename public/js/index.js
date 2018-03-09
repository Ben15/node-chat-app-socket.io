let socket = io();

socket.on('connect', function (){
  console.log('connected to server');

  socket.emit('createMessage', {
    to:'Ashlee',
    text:' Hey, I am hungry'
  })

});

socket.on('disconnect', function(){
  console.log('disconnected from server');
});


socket.on('newMessage', function (message) {
  console.log('You have a new message', message)
})
