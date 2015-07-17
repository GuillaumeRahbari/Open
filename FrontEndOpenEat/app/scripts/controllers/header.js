'use strict';

/**
 * @ngdoc function
 * @name frontEndOpenEatApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the frontEndOpenEatApp
 */
angular.module('frontEndOpenEatApp')
  .controller('HeaderCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.toggleNavside = function (){
      angular.element('navside').toggleClass('clicked');
    };

  }]);
