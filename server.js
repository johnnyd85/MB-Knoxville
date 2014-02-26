// Import some node libraries that we will use
var express = require('express'),
    path = require('path'),
    http = require('http'),
    // Import our rides.js file
    ride = require('./routes/rides');

// Instantiate a new express instance as 'app'
var app = express();

// Configure our express server to run on port 3000
app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

// Set up our server routes
app.get('/rides', ride.findAll);
app.get('/rides/:id', ride.findById);

// Run our express server using http
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});