const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const bodyParser = require('body-parser');
const apiRoutes = require('./server/controllers').middleware.apiRoutes;
const sessionUserCheck = require('./server/controllers').middleware.sessionUserCheck;

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// set up the app to use jwtToken
app.use('/api', apiRoutes);

// set up the app to use sessions
app.use(session({
  secret: 'kinggaamuwasamuel',
  name: 'id',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 100000000
  }
}));

app.use('/api', sessionUserCheck);

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Oolalala',
}));

module.exports = app;