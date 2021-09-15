const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// create express app
const app = express();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, () => {
  // Callback to debug
  console.log(`Server is running on localhost:${port}`);
});

// Callback function to complete GET
app.get('/weather', (req, res) => {
  res.send(projectData);
});

// Post Route
app.post('/weather', (req, res) => {
  projectData.temperature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.userResponse = req.body.userResponse;
  res.end();
  console.log(projectData)
});
