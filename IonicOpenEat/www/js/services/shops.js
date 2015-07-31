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
                }).success(function (data){ // success de node js
                    if (data.status === 'success' ) { // success de la bdd
                        deferred.resolve(data.data);
                    }
                    else { // erreur de la bdd
                        deferred.reject(data.data);
                    }

                }).error( function () { // erreur de node js.
                    deferred.reject('Erreur de connexion !');
                });
                return deferred.promise;
            }
        };
    }]);
