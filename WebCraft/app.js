// app.js

// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware to parse JSON and urlencoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to handle GET requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a route to handle POST requests to the '/submit' URL
app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  res.send(`<h2>Thank you for submitting! Details received: Name: ${name}, Email: ${email}</h2>`);
});

// Start the server and listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
