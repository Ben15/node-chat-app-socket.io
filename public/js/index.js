let socket = io();

let messageForm = document.getElementById('message-form')
let locationButton = document.querySelector('#sendLocation')
let messageList = document.querySelector('#messages')
let input = document.querySelector('[name=message]')

socket.on('connect', function (){
  console.log('connected to server');
});

socket.on('disconnect', function(){
  console.log('disconnected from server');
});


socket.on('newMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')
  console.log('You have a new message', message)
  let li = document.createElement('li')

  li.textContent = `${message.from} ${formattedTime}: ${message.text}`

  messageList.appendChild(li)

})

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')
  let li = document.createElement('li')
  let a = document.createElement('a')

  a.setAttribute('href', message.url)
  a.setAttribute('target', '_blank')
  a.textContent = `My current location`
  li.textContent = `${message.from} ${formattedTime}:  `
  li.appendChild(a)

  messageList.appendChild(li)
})


messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: input.value
  }, function() {
    input.value =''
  })

})



locationButton.addEventListener('click', (e) => {
  console.log('Hey')
  e.preventDefault()
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser.')
  }

  locationButton.setAttribute('disabled', 'disabled')
  locationButton.textContent = 'Sending Location....'

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.textContent = 'Send Location'
    locationButton.removeAttribute('disabled');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  }, function(){
    locationButton.removeAttribute('disabled');
    alert('Unable to fetch location')
  })
})
