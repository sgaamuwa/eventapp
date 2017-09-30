const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const apiRoutes = require('./server/controllers').middleware.apiRoutes;

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// set up the app to use jwtToken
app.use('/api', apiRoutes);

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Oolalala',
}));

module.exports = app;