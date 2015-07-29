'use strict';

/**
 * @ngdoc service
 * @name starter.factory:location
 * @description
 * # localisation
 * Service in the starter.
 */
angular.module('starter')
    .factory('location', ['$q',function ($q) {
        return {

            /**
             * Recupere la localisation en utilisant l'API HTML5 geolocation
             */
            getLocation : function () {
                var deferred = $q.defer();
                // Si le navigateur supporte la position.
                if (navigator.geolocation) {
                    // On récupère la position.
                    navigator.geolocation.getCurrentPosition(
                        // Le success.
                        function(position) {
                            deferred.resolve({
                                    latitude : position.coords.latitude,
                                    longitude :  position.coords.longitude
                                });
                        },
                        // L'error.
                        function(positionError) {
                            deferred.reject(positionError);
                        });


                } else {
                    deferred.reject('Geolocation is not supported by this browser.');
                }
                return deferred.promise;
            }
        }
    }]);