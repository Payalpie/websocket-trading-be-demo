const axios = require('axios');
const wss = require('../config/websocket'); // Assuming websocket module exports the wss object

// Helper function to send messages to all connected clients
function broadcastMessage(message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Fetch data from a specified URL with parameters
async function fetchData(url, params = {}) {
  const response = await axios.get(url, { params });
  return response.data;
}

exports.handleTrade = async (req, res) => {
  try {
    // Notify clients about connection status
    broadcastMessage('Backend Connection established');

    // Fetch master trade details
    broadcastMessage('Fetching Master Trade... (Pinging Lambda Function)');
    const masterTradeUrl = 'https://pdzsl5xw2kwfmvauo5g77wok3q0yffpl.lambda-url.us-east-2.on.aws/';
    const masterTrade = await fetchData(masterTradeUrl);

    // Notify clients about trade replication
    broadcastMessage('Duplicating Master Trade');
    const connectParams = {
      user: '44712225',
      password: 'tfkp48',
      host: '18.209.126.198',
      port: 443
    };
    const connectionData = await fetchData('https://mt4.mtapi.io/Connect', connectParams);
    const connectionId = connectionData.id;

    const tradeParams = {
      id: connectionId,
      symbol: masterTrade.symbol,
      operation: masterTrade.operation,
      volume: masterTrade.volume,
      takeprofit: masterTrade.takeprofit,
      comment: masterTrade.comment
    };
    const slaveTrade = await fetchData('https://mt4.mtapi.io/OrderSend', tradeParams);

    // Notify clients about successful replication and show trade details
    broadcastMessage('Successfully Replicated Master Trade');
    broadcastMessage(`Displaying Trade Details:\n${JSON.stringify(slaveTrade, null, 2)}`);

    res.json(slaveTrade);
  } catch (error) {
    console.error('Error processing trade:', error);
    broadcastMessage('Error processing trade');
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
