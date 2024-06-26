const http = require('http');
const app = require('../app');  // Import the Express application
require('dotenv').config();
const { initWebSocketServer } = require('../config/websocket');

const server = http.createServer(app);
const wss = initWebSocketServer(server);  // Initialize WebSocket server

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
