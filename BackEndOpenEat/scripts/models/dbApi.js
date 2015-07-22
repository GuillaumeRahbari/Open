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

    // Gestion des erreurs.
    if(err){
      console.log('error fetching client from pool', err);
    }
    // On effectue la requête sql.
    var query = client.query(sqlRequest);

    // On ferme la connexion.
    query.on('end', function() {
      client.end();
    });

  });

};

/**
 * Permet de lire dans une bdd.
 * @param infosConnectionJSON Les informations de connexion à la bdd.
 * @param sqlRequest La requête sql.
 * @param success La fonction de callback success.
 * @param fail La fonction de callback fail.
 */
exports.read = function (infosConnectionJSON, sqlRequest, success, fail){

  var results = [];

  pg.connect(infosConnectionJSON, function (err, client, done){

    // Gestion des erreurs
    if(err){
      fail();
      console.log('error fetching client from pool', err);
    }
    // On effectue la requête sql
    var query = client.query(sqlRequest);

    // On push les row une par une
    query.on('row', function(row) {
      results.push(row);
    });

    // On ferme la connexion et on retourne les données.
    query.on('end', function() {
      client.end();
      success(results);
    });

  });

};
