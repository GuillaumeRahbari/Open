/**
 * Created by Guillaume on 10/07/15.
 * Ce module permet de faire des requêtes vers la BDD.
 */

// Extend de postgresql
var pg = require('pg');

exports.connect = function (infosConnectionJSON, sqlRequest) {
  pg.connect(infosConnectionJSON, function (err, client, done){
    if(err){
      return console.log('error fetching client from pool', err);
    }
    client.query(sqlRequest, function(err, result){
      done();
      if(err){
        return console.log('error running query', err);
      }
      console.log(result);
    })
  });
};
