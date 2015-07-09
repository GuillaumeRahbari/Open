/**
 * Created by Guillaume on 08/07/2015.
 */

var pg = require('pg'); // Inclusion de postgresql
var fs = require('fs'); // Inclusion de file stream.

// Lecture du fichier d'initialisation de la bdd.
var filedb = __dirname + '/init_Database.sql';
var initdb = fs.readFileSync(filedb).toString();
// Lecture du fichier contenant les infos de connexion.
var connectionString = fs.readFileSync(__dirname + '/connection_infos.json');

// Connexion pour initialiser la bdd.
pg.connect(connectionString, function (err, client, done){
  if(err){
    console.log('error: ', err);
    process.exit(1);
  }
  client.query(initdb, function(err){
    done();
    if(err){
      console.log('error: ', err);
      process.exit(1);
    }
  })
});
