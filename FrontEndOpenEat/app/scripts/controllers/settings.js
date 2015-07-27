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
     * Permet de faire apparaitre ou disparaitre les magasins.
     */
    $scope.toggleShops = function() {
      $scope.$parent.toggleMarkers = !$scope.$parent.toggleMarkers;
    };

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
      var markers = [];
      for (var shop in shops) {
        var marker = {
          position : new google.maps.LatLng(shops[shop].latitude,shops[shop].longitude),
          title : shops[shop].description
        };
        markers.push(new google.maps.Marker(marker));
      }
      $scope.$parent.shopMarkers = markers;
    };

  }]);
