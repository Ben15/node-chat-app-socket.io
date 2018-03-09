const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express()
let server = http.createServer((app))
let io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user connected');


  socket.emit('newMessage', {
    from: 'Ben',
    text: 'Hey, this is a new message',
    createdAt: 1234
  })

  socket.on('createMessage', (newMessage) => {
    console.log('newMessage', newMessage);
  })


  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});



app.use(express.static('public'))

server.listen(port, () => console.log(`App is running on port ${port}!!`))
