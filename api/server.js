const http = require('http');
const app = require('../app'); // Import the Express application
const WebSocket = require('ws');
require('dotenv').config();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

require('../config/websocket')(wss); // WebSocket configuration

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
