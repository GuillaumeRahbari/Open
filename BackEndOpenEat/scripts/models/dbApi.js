/**
 * Created by Guillaume on 10/07/15.
 * Ce module permet de faire des requêtes vers la base de données.
 * Pour pouvoir utiliser ce module il suffit de l'inclure de la manière suivante :
 * require('chemin vers ce fichier');
 */

// Module PostgreSql
var pg = require('pg');

/**
 * Cette fonction permet de se connecter à une base de donnée.
 * Il suffit pour cela de donner les informations de connexion à la base de donnée sous le format suivant :
 * <i>postgres://username:password@host:port/database</i>
 * Et d'indiquer la requête SQL que l'on souhaite exécuter.
 *
 * @param {String} infosConnection - Les informations de connexion à la BDD.
 * @param {String} sqlRequest - La requête SQL à effectuer.
 */
exports.connect = function (infosConnection, sqlRequest) {

  pg.connect(infosConnection, function (err, client, done){

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
 * Cette fonction permet de lire dans une base de donnée.
 * Il suffit pour cela de donner les informations de connexion à la base de donnée sous le format suivant :
 * <i>postgres://username:password@host:port/database</i>
 * Et d'indiquer la requête SQL que l'on souhaite exécuter.
 *
 * @param {String} infosConnection - Les informations de connexion à la BDD.
 * @param {String} sqlRequest - La requête SQL à effectuer.
 * @param {function} success - La fonction callback de success.
 * @param {function} fail - La fonction callback de fail.
 */
//TODO Améliorer les vérifications et la sécurité.
exports.read = function (infosConnection, sqlRequest, success, fail){

  var results = [];

  pg.connect(infosConnection, function (err, client, done){

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

/**
 * Cette fonction permet de mettre à jour certains champs dans une base de donnée.
 * Il suffit pour cela de donner les informations de connexion à la base de donnée sous le format suivant :
 * <i>postgres://username:password@host:port/database</i>
 * Et d'indiquer la requête SQL que l'on souhaite exécuter.
 *
 * @param {String} infosConnection - Les informations de connexion à la BDD.
 * @param {String} sqlRequest - La requête SQL à effectuer.
 * @param {function} success - La fonction callback de success.
 * @param {function} fail - La fonction callback de fail.
 */
exports.update = function (infosConnection, sqlRequest, success, fail){

  pg.connect(infosConnection, function(err, client, done){
    // Gestion des erreurs
    if(err){
      fail();
      console.log('error fetching client from pool', err);
    }

    // On ferme la connexion et on appelle la fonction callback de success.
    client.query(sqlRequest).on('end', function () {
      client.end();
      success();
    });

  });
};
