'use strict';

/**
 * @ngdoc function
 * @name frontEndOpenEatApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the frontEndOpenEatApp
 */
angular.module('frontEndOpenEatApp')
  .controller('SettingsCtrl', ['$scope', function ($scope) {

    $scope.$parent.selectShops = false;

    /*
    Patch pour l'affichage des checkbox.
    Quand on cochait et qu'on changeait de page puis qu'on revenait sur la page,
    ce n'était plus coché alors que ca devait l'etre.
     */
    if ($scope.toggleMarkers){
      angular.element('#toggle-1').attr('checked','checked');
    }

    /**
     * Permet de faire apparaitre ou disparaitre les magasins.
     */
    $scope.toggleShops = function() {
      $scope.$parent.toggleMarkers = !$scope.$parent.toggleMarkers;
      if ($scope.$parent.toggleMarkers) {
        createMarkersForShops($scope.$parent.shops);
      }
    };

    /**
     * Permet de récupérer les marqueurs
     * @param shops
     */
    var createMarkersForShops = function (shops){
      var markers = [];
      for (var shop in shops) {
        var marker = {
          position : new google.maps.LatLng(shops[shop].latitude,shops[shop].longitude),
          title : shops[shop].description,
          zIndex : shops[shop].id
        };
        markers.push(new google.maps.Marker(marker));
      }
      $scope.$parent.shopMarkers = markers;
    };

  }]);
