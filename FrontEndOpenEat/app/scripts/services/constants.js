'use strict';

/**
 * Ce service contient la liste des constantes de l'application.
 * Pour l'utiliser il suffit d'inclure le service <i>constants</i>.
 *
 * @example
 * angular.module('monModule')
 *  .controller('MonCtrl', ['constants', function (constants) {
 *    var serverAdress = constants.backendUrl;
 *  }]);
 *
 * @ngdoc service
 * @name frontEndOpenEatApp.constants
 * @description
 * # constants
 * Constant in the frontEndOpenEatApp.
 */
angular.module('frontEndOpenEatApp')
  .constant('constants', {
    backendUrl : 'http://10.170.2.174:3000/', // L'adresse du serveur.
    markerBlue : '/images/marker-blue.png', // L'image du marqueur bleu.
    markerRed : '/images/marker-red.png' // L'image du marqueur rouge.
  });
