'use strict';

/**
 * @ngdoc function
 * @name frontEndOpenEatApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the frontEndOpenEatApp
 */
angular.module('frontEndOpenEatApp')
  .controller('MapCtrl', ['$scope', 'shops', '$timeout', function ($scope, shops, $timeout) {

    /**
     * Effet de chargement au début.
     */
    $timeout(function () {
      angular.element('#loader').addClass('fadeOut');
      $timeout(function () {
        initialize();
      },1000);
    },2000);


    var map;
    /**
     * Initialisation de la carte google map.
     */
    function initialize () {
      var mapOptions = {
        zoom: 18,
        center: new google.maps.LatLng(48.8879996, 2.2882407)
      };

      map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    }

    /**
     * Permet d'update les markers des magasins.
     */
    function updateShopsMarkers (){
      if (!$scope.$parent.toggleMarkers){
        for (var marker in $scope.$parent.shopMarkers){
          var currentMarker = $scope.$parent.shopMarkers[marker];
          currentMarker.setMap(null);
          google.maps.event.clearInstanceListeners(currentMarker, 'click');
        }
      }
      else {
        for (var marker in $scope.$parent.shopMarkers){
          var currentMarker = $scope.$parent.shopMarkers[marker];
          currentMarker.setAnimation(google.maps.Animation.DROP);

          var infowindow = new google.maps.InfoWindow({
            content: currentMarker.title
          });

          attachListener(currentMarker, infowindow);
          currentMarker.setMap(map);
        }
      }
    }

    function attachListener (marker, infowindow){
      google.maps.event.addListener( marker, 'click', function(){
        map.panTo(marker.getPosition());
        console.log(marker);
        infowindow.open(map,marker);
      });
    }

    // Permet de voir quand la variable est modifié.
    $scope.$parent.$watch('toggleMarkers', updateShopsMarkers);

  }]);
