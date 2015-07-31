/**
 * Created by Guillaume on 08/07/2015.
 */

var express = require('express');
// Création d'un routeur
var router = express.Router();

var database = require('./../models/database');

// La route pour '/users'
router.post('/users', function(req,res){
  console.log(req.body);
  var success = function () {
    var finalObject = {
      status : 'success'
    };
    console.log(finalObject);
    res.send(finalObject);
  };

  var fail = function(){
    res.sendStatus(500);
  };

  // Grab data from http request
  var data = req.body;

  database.shopsChosen(data, success, fail);
});

// La route pour '/users'
router.get('/users', function (req, res) {
  var success = function (objetJSON) {
    var finalObject = {
      status : 'success',
      data: objetJSON
    };
    console.log(finalObject);
    res.send(finalObject);
  };

  var fail = function(){
    res.sendStatus(500);
  };

  database.getShopsChosen(success, fail);

});

// La route pour '/shops'
router.get('/shops', function (req, res) {
  var success = function (objetJSON) {
    var finalObject = {
      status : 'success',
      data: objetJSON
    };
    console.log(finalObject);
    res.send(finalObject);
  };

  var fail = function(){
    res.sendStatus(500);
  };

  database.getShops(success, fail);

});

// La route lorsqu'on a pas trouvé la page (404 page not found).
router.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.sendStatus(404);
});

module.exports = router;
