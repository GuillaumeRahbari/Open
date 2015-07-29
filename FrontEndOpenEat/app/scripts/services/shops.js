'use strict';

/**
 * @ngdoc service
 * @name frontEndOpenEatApp.shops
 * @description
 * # shops
 * Factory in the frontEndOpenEatApp.
 */
angular.module('frontEndOpenEatApp')
  .factory('shops',['$q', '$http', 'constants', function ($q, $http, constants) {

    // Public API here
    return {
      getShops: function () {
        var deferred = $q.defer();
        $http({
          method : 'GET',
          url : constants.backendUrl + 'shops/',
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
      },

      createRoute : function (data) {
        var deferred = $q.defer();
        $http({
          method: 'POST',
          url: constants.backendUrl + 'users/',
          data: data,
          headers: {'Content-Type': 'application/json'}
        }).success(function (data) { // success de node js
          if (data.status === 'success') { // success de la bdd
            deferred.resolve(data);
          } else { // erreur de la bdd
            deferred.reject(data.data);
          }
        }).error(function () { // erreur de node js.
          deferred.reject('Erreur de connexion !');
        });
        return deferred.promise;
      }
    };
  }]);
