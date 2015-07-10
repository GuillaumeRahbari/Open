/**
 * Created by Guillaume on 08/07/2015.
 */

var pg = require('./dbApi'); // Inclusion de notre api database
var fs = require('fs'); // Inclusion de file stream.

/**
 * Fonction d'initialisation de la base de donnée PostegreSQL
 * On utilise pour cela les fichiers :
 * - connection_infos.json (contenant les informations de connexion à la BDD)
 * - init_Database.sql (contenant la création de la BDD de base).
 */
exports.initialisationBDD = function() {

  // Lecture du fichier contenant la BDD de base.
  var fileBDD = fs.readFileSync(__dirname + '/init_Database.sql').toString();

  // Lecture du fichier contenant les infos de connexion au format JSON.
  var connectionJSON = fs.readFileSync(__dirname + '/connection_infos.json');

  // Connexion pour initialiser la bdd.
  pg.connect(connectionJSON,fileBDD);

};
