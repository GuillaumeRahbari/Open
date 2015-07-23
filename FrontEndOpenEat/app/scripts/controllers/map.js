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
        latitude: 51.219053,
        longitude: 4.404418
      },
      zoom: 14
    };

    $scope.options = {
    };

    shops.getShops().then(
      function (data){
        console.log(data);
      }, function (msg) {
        console.log(msg);
      }
    );


    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function() {

    });

  }]);
