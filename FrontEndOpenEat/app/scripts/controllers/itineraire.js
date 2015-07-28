'use strict';

/**
 * @ngdoc function
 * @name frontEndOpenEatApp.controller:ItineraireCtrl
 * @description
 * # ItineraireCtrl
 * Controller of the frontEndOpenEatApp
 */
angular.module('frontEndOpenEatApp')
  .controller('ItineraireCtrl',['$scope', function ($scope) {
    $scope.$parent.selectShops = true;
  }]);
