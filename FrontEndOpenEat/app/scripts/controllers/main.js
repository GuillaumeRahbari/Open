'use strict';

/**
 * @ngdoc function
 * @name frontEndOpenEatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontEndOpenEatApp
 */
angular.module('frontEndOpenEatApp')
  .controller('MainCtrl', ['$scope', 'uiGmapGoogleMapApi', function ($scope, uiGmapGoogleMapApi) {

    $scope.map = {
      center: {
        latitude: 51.219053,
        longitude: 4.404418
      },
      zoom: 14
    };
    
    $scope.options = {scrollwheel: false};

    $scope.$on('$viewContentLoaded', function () {
      var mapHeight = 500; // or any other calculated value
      $("#my-map .angular-google-map-container").height(mapHeight);
    });

    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function() {

    });


  }]);
