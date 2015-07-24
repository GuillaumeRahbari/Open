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

    /**
     * Initialisation de la carte google map.
     */
    function initialize () {
      var mapOptions = {
        zoom: 18,
        center: new google.maps.LatLng(48.8879996, 2.2882407)
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

      for (var shop in $scope.$parent.shopMarkers){
        var marker = new google.maps.Marker($scope.$parent.shopMarkers[shop]);
        marker.setMap(map);
      }
    }

    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    /*uiGmapGoogleMapApi.then(
      function() {
        $timeout(function () {
          angular.element('#loader').addClass('fadeOut');
          $timeout(function () {
            $scope.map = {
              center: {
                latitude: 48.8879996,
                longitude: 2.2882407
              },
              zoom: 18,
              event : {
              }
            };
            angular.element('#loader').css('display', 'none');
            angular.element('#my-map').css('display', 'block');
          }, 1000);
        }, 2000);
      }, function(msg){
        console.log(msg);
      }
    );*/

    /**
     * Action a effectué lorsque l'on clique sur un marqueur.
     * @param instanceMarker Une instance du marqueur.
     * @param eventName Le nom de l'event.
     * @param infosMarker Les infos du marqueur récupérés depuis la bdd.
     */
    $scope.markerClick = function (instanceMarker, eventName, infosMarker) {
      instanceMarker.getMap().panTo(instanceMarker.getPosition());
      $scope.infosMarker = infosMarker.title;
      $scope.windowCenter = infosMarker;
      $scope.windowOptions.visible = !$scope.windowOptions.visible;
    };

    $scope.windowOptions = {
      content : '<div>' + $scope.infosMarker + '</div>'
    };

    $scope.closeClick = function() {
      $scope.windowOptions.visible = false;
    };

  }]);
