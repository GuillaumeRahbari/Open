/**
 * Created by Guillaume on 10/07/15.
 * Ce module permet de faire des requêtes vers la BDD.
 */

// Module PostgreSql
var pg = require('pg');

/**
 * Permet la connexion à une Base de Donnée.
 * @param infosConnectionJSON Les informations de connexion à la BDD au format JSON.
 * @param sqlRequest La requête SQL à effctuer.
 */
exports.connect = function (infosConnectionJSON, sqlRequest) {

  pg.connect(infosConnectionJSON, function (err, client, done){

    // Si on arrive pas à se connecter
    if(err){
      return console.log('error fetching client from pool', err);
    }
    // Si on a réussi alors on reçoit l'objet client
    client.query(sqlRequest, function(err, result){
      done();
      if(err){
        return console.log('error running query', err);
      }
      console.log(result);
    })
  });
};
