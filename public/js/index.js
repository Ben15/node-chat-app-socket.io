let socket = io();

socket.on('connect', function (){
  console.log('connected to server');



});

socket.on('disconnect', function(){
  console.log('disconnected from server');
});


socket.on('newMessage', function (message) {
  console.log('You have a new message', message)
  let li = document.createElement('li')
  let messageList = document.querySelector('#messages')
  li.textContent = `${message.from}: ${message.text}`

  messageList.appendChild(li)

})


let messageForm = document.getElementById('message-form')

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let input = document.querySelector('[name=message]')
  socket.emit('createMessage', {
    from: 'User',
    text: input.value
  }, function() {

  })

})

let locationButton = document.querySelector('#sendLocation')

locationButton.addEventListener('click', (e) => {
  debugger
  console.log('Hey')
  e.preventDefault()
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.')
  }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      lingitude: position.coords.longitude
    });
  }, function(){
    alert('Unable to fetch location')
  })
})
