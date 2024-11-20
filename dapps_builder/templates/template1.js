// templates/template1.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Sample endpoint for listing items
app.get('/api/items', (req, res) => {
    res.json([
        { id: 1, name: 'Item 1', price: 10 },
        { id: 2, name: 'Item 2', price: 20 }
    ]);
});

// Sample endpoint for creating an item
app.post('/api/items', (req, res) => {
    const newItem = req.body;
    // Logic to save the item to the database would go here
    res.status(201).json(newItem);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Marketplace DApp running on port ${PORT}`);
});
