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
  // let template = jQuery('#message-template').html()
  // let html = Mustache.render(template);
  // jQuery('#messages').append(html);

  let formattedTime = moment(message.createdAt).format('h:mm a')
  let template = document.querySelector('#message-template').innerHTML
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  messageList.insertAdjacentHTML('beforeend', html);

})

socket.on('newLocationMessage', function (message) {
  let formattedTime = moment(message.createdAt).format('h:mm a')
  let template = document.querySelector('#location-message-template').innerHTML
  let html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  })

  messageList.insertAdjacentHTML('beforeend', html)
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
