'use strict';

/**
 * @ngdoc function
 * @name frontEndOpenEatApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the frontEndOpenEatApp
 */
angular.module('frontEndOpenEatApp')
  .controller('MapCtrl', ['$scope', 'uiGmapGoogleMapApi', 'shops', '$timeout', function ($scope, uiGmapGoogleMapApi, shops, $timeout) {

    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(
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
    );

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
