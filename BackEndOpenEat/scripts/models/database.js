/**
 * Created by Guillaume on 08/07/2015.
 */

var database = require('./dbApi'); // Inclusion de notre api database
var fs = require('fs'); // Inclusion de file stream.

// Lecture du fichier contenant les infos de connexion au format JSON.
var connectionJSON = fs.readFileSync(__dirname + '/connection_infos.json');

/**
 * Fonction d'initialisation de la base de donnée PostegreSQL
 * On utilise pour cela les fichiers :
 * - connection_infos.json (contenant les informations de connexion à la BDD)
 * - init_Database.sql (contenant la création de la BDD de base).
 */
exports.initialisationBDD = function() {

  // Lecture du fichier contenant la BDD de base.
  var sqlInitRequest = fs.readFileSync(__dirname + '/init_Database.sql').toString();

  // Connexion pour initialiser la bdd.
  database.connect(connectionJSON,sqlInitRequest);

};

/**
 * Fonction permettant de récupérer tous les magasins.
 * @param success La fonction callback de success.
 * @param fail La fonction callback de fail.
 */
exports.getShops = function(success, fail) {
  database.read(connectionJSON, "SELECT * FROM shops", success, fail);
};
