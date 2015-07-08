/**
 * Created by Guillaume on 08/07/2015.
 */

var express = require('express');
var route = express.Router();

route.get('/', function (req, res) {
  res.send('Hello World!');
});

route.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
});

module.exports = route;
