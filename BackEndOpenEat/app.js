

var express = require('express');
var logger = require('morgan'); // Permet de gérer les logs et la coloration des messages.
var router = require('./scripts/apiRequests/routes');
var database = require('./scripts/models/database');
var app = express();

app.use(logger('dev'));

database.initialisationBDD();

app.use('/',router);

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});


module.exports = app;
