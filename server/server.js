const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message.js')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express()
let server = http.createServer((app))
let io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');

  socket.on('createLocationMessage', (coords) => {
    io.emit('newMessage', generateMessage('Admin',`${coords.latitude}, ${coords.longitude}`));
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected');
    });
  });
};






app.use(express.static('public'))

server.listen(port, () => console.log(`App is running on port ${port}!!`))
