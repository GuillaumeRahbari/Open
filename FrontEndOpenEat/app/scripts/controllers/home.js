'use strict';

/**
 * @ngdoc function
 * @name frontEndOpenEatApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the frontEndOpenEatApp
 */
angular.module('frontEndOpenEatApp')
  .controller('HomeCtrl', ['$scope', function ($scope) {

    $scope.$parent.selectShops = false;

  }]);
