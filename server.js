const http = require('http');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;

(async () => {
  // Import and set up MongoDB from db.js file
  const db = await require('./db')();

  // Import and set up Express app from app.js file
  const app = require('./app')(db);

  const server = http.createServer(app);
  const io = socketIO(server);

  // Import and use routes from routes.js file
  const routes = require('./routes')(db);
  app.use(routes);

  // Import and use Socket.IO logic from socket.js file
  require('./socket')(io);

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
