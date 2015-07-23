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
      zoom: 18,
      event : {
      }
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
     * Permet de récupérer les marqueurs
     * @param shops
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

    /**
     * Action a effectué lorsque l'on clique sur un marqueur.
     * @param instanceMarker Une instance du marqueur.
     * @param eventName Le nom de l'event.
     * @param infosMarker Les infos du marqueur récupérés depuis la bdd.
     */
    $scope.markerClick = function (instanceMarker, eventName, infosMarker) {
      instanceMarker.getMap().panTo(instanceMarker.getPosition());
    };

  }]);
