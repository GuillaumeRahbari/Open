'use strict';

/**
 * @ngdoc function
 * @name frontEndOpenEatApp.controller:ItineraireCtrl
 * @description
 * # ItineraireCtrl
 * Controller of the frontEndOpenEatApp
 */
angular.module('frontEndOpenEatApp')
  .controller('ItineraireCtrl',['$scope', 'shops', function ($scope, shops) {
    $scope.$parent.selectShops = true;

    $scope.validateChosenShops = function () {
      shops.createRoute($scope.selectedShops).then(
        function (data) {
          console.log(data);
        },
        function (msg) {
          console.log(msg);
        }
      )
    };
  }]);
