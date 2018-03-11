let socket = io();

let messageForm = document.getElementById('message-form')
let locationButton = document.querySelector('#sendLocation')
let messageList = document.querySelector('#messages')

socket.on('connect', function (){
  console.log('connected to server');
});

socket.on('disconnect', function(){
  console.log('disconnected from server');
});


socket.on('newMessage', function (message) {
  console.log('You have a new message', message)
  let li = document.createElement('li')

  li.textContent = `${message.from}: ${message.text}`

  messageList.appendChild(li)

})

socket.on('newLocationMessage', function (message) {
  let li = document.createElement('li')
  let a = document.createElement('a')

  a.setAttribute('href', message.url)
  a.setAttribute('target', '_blank')
  a.textContent = `My current location`
  li.textContent = `${message.from}: `
  li.appendChild(a)

  messageList.appendChild(li)
})






messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let input = document.querySelector('[name=message]')
  socket.emit('createMessage', {
    from: 'User',
    text: input.value
  }, function() {

  })

})



locationButton.addEventListener('click', (e) => {
  console.log('Hey')
  e.preventDefault()
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.')
  }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  }, function(){
    alert('Unable to fetch location')
  })
})
