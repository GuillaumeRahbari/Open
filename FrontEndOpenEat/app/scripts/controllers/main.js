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
    $scope.shopMarkers = []; // La liste des magasins.
    $scope.toggleMarkers = false; // Permet d'afficher ou non les magasins (défaut non).
    $scope.selectShops = false; // Permet de savoir si on affiche des infos sur les magasins ou si on les sélectionne.
  }]);
