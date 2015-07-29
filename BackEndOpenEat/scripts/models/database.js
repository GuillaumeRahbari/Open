/**
 * Created by Guillaume on 08/07/2015.
 */

var database = require('./dbApi'); // Inclusion de notre api database
var fs = require('fs'); // Inclusion de file stream.

// Les infos de connexion.
var connectionJSON = 'postgres://Guillaume:open@localhost/OpenEat';

/**
 * Fonction d'initialisation de la base de donnée PostegreSQL
 * On utilise pour cela le fichier :
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

/**
 * Fonction permettant de noter en bdd les magasins choisis par l'utilisateur.
 * @param shops Les différents magasins choisis.
 * @param success La fonction callback de success.
 * @param fail La fonction callback de fail.
 */
exports.shopsChosen = function (shops, success, fail){

  var sqlrequest= "UPDATE shops SET id_user=NULL WHERE id_user IS NOT NULL;";

  if (shops.length != 0) {
    for (var shop in shops){
      sqlrequest += "UPDATE shops SET id_user=1 WHERE id=" + shops[shop] + ";";
    }
    database.update(connectionJSON, sqlrequest, success, fail);
  }
  else {
    database.update(connectionJSON,sqlrequest, success, fail);
  }
};
