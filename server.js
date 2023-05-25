const express = require('express');
const path = require('path'); // this is new
const app = express();

app.use(express.static('public')); // serve static files from 'public' directory

// Define your routes here
app.get('/signup', function (req, res) {
  // send the signup page
  res.sendFile(path.join(__dirname, '/public/signup.html'));
});

app.get('/login', function (req, res) {
  // send the login page
  res.sendFile(path.join(__dirname, '/public/login.html'));
});

// Add a route for the root directory
app.get('/', function (req, res) {
  // send the index page
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});
