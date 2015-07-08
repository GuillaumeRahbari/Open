

var express = require('express');
var logger = require('morgan'); // Permet de gérer les logs et la coloration des messages.

var app = express();

app.use(logger('dev'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});


module.exports = app;
