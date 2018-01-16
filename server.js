var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var appRoutes = require('./routes/routes');
var db = require('./config/database');

mongoose.connect(db.url);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

//app routes
app.use('/', appRoutes);

app.listen('5000');
console.log('App listening on port 5000');