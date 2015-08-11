/**
 * Created by Guillaume on 08/07/2015.
 * Ce module permet de faire des requêtes vers notre base de données.
 * Pour pouvoir utiliser ce module il suffit de l'inclure de la manière suivante :
 * require('chemin vers ce fichier');
 */

var database = require('./dbApi'); // Inclusion de notre api database
var fs = require('fs'); // Inclusion de file stream.

// Les informations de connexion à notre base de données.
var infosConnexion = 'postgres://Guillaume:open@localhost/OpenEat';

/**
 * Cette fonction permet d'initialiser la base de données.
 * Pour cela elle lit le fichier <i>init_Database.sql</i> qui contient les tables de la base de données.
 * Puis on se connecte à la base de données via le module {@link database}.
 */
exports.initialisationBDD = function() {

  // Lecture du fichier contenant la BDD de base.
  var sqlInitRequest = fs.readFileSync(__dirname + '/init_Database.sql').toString();

  // Connexion pour initialiser la bdd.
  database.connect(infosConnexion,sqlInitRequest);

};

/**
 * Cette fonction permet de récupérer tous les magasins présents en base de données.
 * Pour cela elle fait appelle à la fonction read du module {@link database}.
 * @param {function} success - La fonction callback de success.
 * @param {function} fail - La fonction callback de fail.
 */
exports.getShops = function(success, fail) {
  database.read(infosConnexion, "SELECT * FROM shops;", success, fail);
};

/**
 * Cette fonction permet de récupérer tous les magasins que l'utilisateur a choisi.
 * Pour cela elle fait appelle à la fonction read du module {@link database}.
 * @param {function} success - La fonction callback de success.
 * @param {function} fail - La fonction callback de fail.
 */
exports.getShopsChosen = function (success, fail) {
  database.read(infosConnexion, "SELECT * FROM shops WHERE id_user=1;", success, fail);
};

/**
 * Cette fonction permet de mettre à jour en bdd les magasins choisis par l'utilisateur.
 * Pour cela elle fait appelle à la fonction update du module {@link database}.
 * @param {Array} shops - Les id des magasins choisis par l'utilisateur.
 * @param {function} success - La fonction callback de success.
 * @param {function} fail - La fonction callback de fail.
 */
exports.shopsChosen = function (shops, success, fail){

  // Cette requête permet de déselectionner les magasins précédemment choisis par l'utilisateur.
  var sqlrequest= "UPDATE shops SET id_user=NULL WHERE id_user IS NOT NULL;";

  // Si l'utilisateur a choisi des magasins.
  if (shops.length != 0) {
    // Alors on update chaque magasin choisi par l'utilisateur en bdd en concatenant l'update à la requete sql.
    shops.forEach(function (shopId) {
      sqlrequest += "UPDATE shops SET id_user=1 WHERE id=" + shopId + ";";
    });
    database.update(infosConnexion, sqlrequest, success, fail);
  }
  // Sinon on envoie la requete sql qui ne contient que la réinitialisation.
  else {
    database.update(infosConnexion,sqlrequest, success, fail);
  }
};
