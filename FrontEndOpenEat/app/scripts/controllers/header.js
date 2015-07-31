'use strict';

/**
 * @ngdoc function
 * @name frontEndOpenEatApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the frontEndOpenEatApp
 */
angular.module('frontEndOpenEatApp')
  .controller('HeaderCtrl', ['$scope', function ($scope) {

    $scope.displayNavside =  function() {
      angular.element('navside').addClass('clicked');
    };

  }]);
