/**
 * Created by Guillaume on 08/07/2015.
 */

var express = require('express');
// Création d'un routeur
var router = express.Router();

var database = require('./../models/database');

// La route pour '/'
router.get('/', function (req, res) {
  res.send('Hello World!');
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
    res.status(500);
  };

  database.getShops(success, fail);

});

// La route lorsqu'on a pas trouvé la page (404 page not found).
router.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
});

module.exports = router;
