// templates/template2.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Sample endpoint for getting user profiles
app.get('/api/profiles', (req, res) => {
    res.json([
        { id: 1, username: 'User 1', bio: 'Hello, I am User1!' },
        { id: 2, username: 'User 2', bio: 'Hello, I am User2!' }
    ]);
});

// Sample endpoint for creating a new post
app.post('/api/posts', (req```javascript
.body) => {
    const newPost = req.body;
    // Logic to save the post to the database would go here
    res.status(201).json(newPost);
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Social Networking DApp running on port ${PORT}`);
});
