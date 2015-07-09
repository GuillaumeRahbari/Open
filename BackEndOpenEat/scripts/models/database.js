/**
 * Created by Guillaume on 08/07/2015.
 */

var pg = require('pg'); // Inclusion de postgresql
var fs = require('fs'); // Inclusion de file stream.

// Lecture du fichier d'initialisation de la bdd.
var initdb= fs.readFileSync('init_Database.sql').toString();
// Lecture du fichier contenant les infos de connexion.
var connectionString = fs.readFileSync('connection_infos.json');

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
    process.exit(0);
  });
});
