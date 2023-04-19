// socket.js

module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('A user connected');
      socket.emit('welcome', 'Welcome to Interstellar Factory Tycoon!');
  
      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
  
      // Add any additional Socket.IO event listeners here
    });
  };
  