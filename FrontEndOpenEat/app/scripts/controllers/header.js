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

    $scope.displayNavside =  function() {
      if (!angular.element('navside').hasClass('clicked')) {
        angular.element('navside').addClass('clicked');
      }
    };

  }]);
