const express = require('express');
const cors = require('cors');
const tradeRoutes = require('./routes/tradeRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/trade', tradeRoutes);

app.get("/", (req, res) => res.send("Test Ping"));

module.exports = app;
