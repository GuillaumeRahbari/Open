'use strict';

/**
 * @ngdoc function
 * @name frontEndOpenEatApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the frontEndOpenEatApp
 */
angular.module('frontEndOpenEatApp')
  .controller('MapCtrl', ['$scope', 'uiGmapGoogleMapApi', function ($scope, uiGmapGoogleMapApi) {

    $scope.map = {
      center: {
        latitude: 51.219053,
        longitude: 4.404418
      },
      zoom: 14
    };

    $scope.options = {
    };


    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function() {

    });

  }]);
