'use strict';

/**
 * @ngdoc service
 * @name starter.factory:googleMapApp
 * @description
 * # googleMapApp
 * Factory in the starter.
 */
angular.module('starter')
    .factory('googleMapApp', ['$q', 'constants', '$cordovaAppAvailability', function ($q, constants, $cordovaAppAvailability) {

        var scheme;
        var url;
        // Public API here
        return {
            
            defineGoogleMapUri: function () {
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

            launchGoogleMapApp: function (jsonParam) {
                window.open('geo:37.7749,-122.4194', '_system', 'location=no');
            }
        };
    }]);
