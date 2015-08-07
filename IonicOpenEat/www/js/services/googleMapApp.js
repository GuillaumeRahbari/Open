'use strict';

/**
 * Ce service permet d'interagir avec tout ce qui concerne l'application Google Map présente sur smartphones.
 * On peut notamment définir l'uri google map pour le device que l'on utilise,
 * savoir si l'application est disponible sur le device en question,
 * et lancer l'application Google Map depuis notre application.
 * Pour cela il faut inclure le service <i>googleMapApp</i>
 *
 * @example
 * Voilà comment inclure le service :
 * angular.module('monModule')
 *  .controller('MonCtrl', ['googleMapApp', function (googleMapApp) {
 * }]);
 *
 * @ngdoc service
 * @name starter.factory:googleMapApp
 * @description
 * # googleMapApp
 * Factory in the starter.
 */
angular.module('starter')
    .factory('googleMapApp', ['$q', 'constants', '$cordovaAppAvailability', function ($q, constants, $cordovaAppAvailability) {

        var scheme; // L'uri permettant d'appeler les fonctions google map app.
        var url; // Le début de l'url permettant de générer l'url des fonctions google map.
        // Public API here
        return {

            /**
             * Cette fonction permet de définir les variables <i>scheme</i> et <i>url</i>.
             * Ces variables sont propres à chaque device.
             *
             * @example Voici comment utiliser cette fonction :
             *  googleMapApp.defineGoogleMapAppUri();
             */
            defineGoogleMapAppUri: function () {
                var googleMap = constants.googleMap;
                switch (ionic.Platform.platform()){
                    case 'iOS': //TODO vérifier que tout cela fonctionne pour ios.
                        var gMapIOS = googleMap.ios;
                        scheme = gMapIOS.scheme;
                        url = gMapIOS.url;
                        break;
                    case 'android':
                        var gMapAndroid = googleMap.android;
                        scheme = gMapAndroid.scheme;
                        url = gMapAndroid.url;
                        break;
                    default : // TODO définir les valeurs par défaut.
                        scheme = 'cc';
                        url = 'cc';
                        break;
                }
            },

            /**
             * Cette fonction permet de savoir si l'application Google Map est présente sur le device.
             * Cette fonction retourne une promesse.
             *
             * @example Voici comment utiliser cette fonction :
             *  googleMapApp.isGoogleMapAppAvailable().then(
             *    // Fonction callback lors du success
             *    function () {
             *      console.log('App Available);
             *    },
             *    // Fonction callback d'erreur.
             *    function (msgErreur) {
             *      console.log(msgErreur);
             *    }
             *  );
             *
             * @returns {Function|promise} Retourne une promesse de réponse.
             */
            isGoogleMapAppAvailable: function () {
                var deferred = $q.defer();

                $cordovaAppAvailability.check(scheme).then(
                    function () {
                        deferred.resolve();
                    },
                    function () {
                        deferred.reject('application not available');
                    }
                );
                return deferred.promise;

            },

            /**
             * Cette fonction permet de lancer l'application Google Map.
             *
             * @example Voici comment utiliser cette fonction :
             *  var travelMode;
             *  var jsonParams = {
             *      travelMode: travelMode,
             *      position: {
             *          latitude: latitudeOfThePlaceYouWantToGo,
             *          longitude: longtudeOfThePlaceYouWantToGo
             *      }
             *  }
             *  googleMapApp.launchGoogleMapApp(jsonParams);
             *
             *  travelMode peut prendre les valeurs suivantes :
             *  <ul>
             *      <li>'d' for Driving</li>
             *      <li>'w' for Walking</li>
             *      <li>'b' for Bicycling</li>
             *  </ul>
             *
             * @param {Object} jsonParams - Les paramètres que l'on souhaite utiliser lors de l'appelle à l'application Google Map
             */
            launchGoogleMapApp: function (jsonParams) {
                var uri = url
                    + jsonParams.position.latitude
                    + ','
                    + jsonParams.position.longitude
                    + '&mode='
                    + jsonParams.travelMode;
                window.open(uri, '_system', 'location=no');
            }
        };
    }]);
