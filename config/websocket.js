const WebSocket = require('ws');  // Ensure this is at the top of the file

let wss = null;

const initWebSocketServer = (server) => {
  wss = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
    console.log('Connection successfully established');
    ws.on('close', () => {
      console.log('Connection removed');
    });
  });
  return wss;
};

const getWebSocketServer = () => {
  if (!wss) {
    throw new Error("WebSocket server has not been initialized yet.");
  }
  return wss;
};

module.exports = { initWebSocketServer, getWebSocketServer, WebSocket };  // Export WebSocket for use elsewhere if needed
