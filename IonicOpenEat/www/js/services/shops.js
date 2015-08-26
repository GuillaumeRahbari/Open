'use strict';

/**
 * @ngdoc service
 * @name starter.factory:shops
 * @description
 * # shops
 * Factory in the starter.
 */
angular.module('starter')
    .factory('shops',['$q', '$http', 'constants', function ($q, $http, constants) {

        // Public API here
        return {
            getShops: function () {
                var deferred = $q.defer();
                $http({
                    method : 'GET',
                    url : constants.backendUrl + 'users/',
                    headers: {'Content-Type': 'application/json'}
                }).then(
                    function (data) { // success de node js
                        if (data.status === 200 ) { // success de la bdd
                            deferred.resolve(data.data);
                        }
                        else { // erreur de la bdd
                            deferred.reject('Erreur BDD : ' + data.status);
                        }
                    },
                    function () { // erreur de node js.
                        deferred.reject('Erreur de connexion !');
                    }
                );

                return deferred.promise;
            }
        };
    }]);
