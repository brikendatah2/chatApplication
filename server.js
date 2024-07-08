const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


const userRoutes = require('./Routes/userRoutes');
const messageRoutes = require('./Routes/MessageRoutes');
const conversationRoutes = require('./Routes/conversationRoutes');
const groupRoutes = require('./Routes/groupRoutes');
const notificationRoutes = require('./Routes/notificationRoutes');
const friendListRoutes = require('./Routes/friendListRoutes');
const followListRoutes = require('./Routes/followListRoutes');
const reportRoutes = require('./Routes/reportRoutes');

const PORT = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost:27017/chatApplication')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/friendlist', friendListRoutes);
app.use('/api/followlist', followListRoutes);
app.use('/api/reports', reportRoutes);

// Socket.io connection
io.on('connection', socket => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Handle chat messages
  socket.on('chat message', msg => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
