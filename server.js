const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Example API Proxy Endpoint to safely communicate with Roblox APIs
app.get('/api/roblox-user/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://users.roblox.com/v1/users/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Roblox data' });
    }
});

// Example Data Endpoint to receive game data via Roblox HttpService
app.post('/api/game-data', (req, res) => {
    console.log("Data received from Roblox Studio:", req.body);
    res.json({ status: "success", received: true });
});

app.listen(PORT, () => {
    console.log(`Roblox web service running on port ${PORT}`);
});
