'use strict';

/**
 * @ngdoc function
 * @name frontEndOpenEatApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the frontEndOpenEatApp
 */
angular.module('frontEndOpenEatApp')
  .controller('MapCtrl', ['$scope', 'uiGmapGoogleMapApi', 'shops', function ($scope, uiGmapGoogleMapApi, shops) {

    $scope.map = {
      center: {
        latitude: 48.8879996,
        longitude: 2.2882407
      },
      zoom: 16
    };

    $scope.options = {
    };

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
     * Permet de récupérer les
     * @param data
     */
    var createMarkersForShops = function (shops){
      $scope.shopMarkers = [];
      for (var shop in shops) {
        var marker = {
          id : shops[shop].id,
          latitude : shops[shop].latitude,
          longitude : shops[shop].longitude,
          title : shops[shop].description
        };
        $scope.shopMarkers.push(marker);
      }
    };


    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function() {

    });

  }]);
