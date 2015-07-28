'use strict';

/**
 * @ngdoc function
 * @name frontEndOpenEatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontEndOpenEatApp
 */
angular.module('frontEndOpenEatApp')
  .controller('MainCtrl', ['$scope','shops', function ($scope, shops) {
    $scope.shopMarkers = []; // La liste des marqueurs de magasins.
    $scope.toggleMarkers = false; // Permet d'afficher ou non les magasins (défaut non).
    $scope.selectShops = false; // Permet de savoir si on affiche des infos sur les magasins ou si on les sélectionne.
    $scope.selectedShops = []; // Contient les magasins sélectionnés.

    /**
     * Chargement des magasins.
     * On le fait une seule fois ici pour ne pas avoir de doublons par la suite.
     */
    shops.getShops().then(
      function (data){
        $scope.shops = data;
      }, function (msg) {
        console.log(msg);
      }
    );
  }]);
