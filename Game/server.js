const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

    
// Middleware to serve static files (like CSS, JS)
app.use(express.static('public'));

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Update this to the correct path for your HTML file
});

// API endpoint to get concepts data
app.get('/api/concepts', (req, res) => {
    res.json(conceptsData);
});

// API endpoint to get meanings data
app.get('/api/meanings', (req, res) => {
    res.json(meaningsData);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
