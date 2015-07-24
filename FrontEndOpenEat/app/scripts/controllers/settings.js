'use strict';

/**
 * @ngdoc function
 * @name frontEndOpenEatApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the frontEndOpenEatApp
 */
angular.module('frontEndOpenEatApp')
  .controller('SettingsCtrl', ['$scope', 'shops', function ($scope, shops) {

    /**
     * Permet de récupérer tous les magasins
     */
    shops.getShops().then(
      function (data){
        createMarkersForShops(data);
      }, function (msg) {
        console.log(msg);
      }
    );

    /**
     * Permet de récupérer les marqueurs
     * @param shops
     */
    var createMarkersForShops = function (shops){
      for (var shop in shops) {
        var marker = {
          id : shops[shop].id,
          latitude : shops[shop].latitude,
          longitude : shops[shop].longitude,
          title : shops[shop].description
        };
        $scope.$parent.shopMarkers.push(marker);
      }
    };

  }]);
