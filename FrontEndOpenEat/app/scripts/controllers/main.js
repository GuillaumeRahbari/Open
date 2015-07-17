'use strict';

/**
 * @ngdoc function
 * @name frontEndOpenEatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontEndOpenEatApp
 */
angular.module('frontEndOpenEatApp')
  .controller('MainCtrl', ['$scope', function ($scope) {

    $scope.$on('$locationChangeStart', function() {
      if (!angular.element('navside').hasClass('clicked')) {
        angular.element('navside').addClass('clicked');
      }
    });

  }]);
