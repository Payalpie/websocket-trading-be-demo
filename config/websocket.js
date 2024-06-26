module.exports = (wss) => {
  wss.on('connection', (ws) => {
    console.log('connection successfully established');
    ws.on('close', () => {
      console.log('connection removed');
    });
  });

  // Utility to send messages to all clients
  wss.broadcast = (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  };
};
