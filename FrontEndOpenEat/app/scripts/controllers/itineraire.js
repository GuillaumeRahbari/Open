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

    /**
     * Cette fonction permet de valider les magasins choisis et d'envoyer la sélection au serveur.
     */
    $scope.validateChosenShops = function () {
      shops.postShopsChosen($scope.selectedShops).then(
        function (data) {
          // TODO remplacer le console.log par une redirection vers la page que l'on souhaite en cas de succès
          console.log(data);
        },
        function (msg) {
          // TODO gérer le cas où cela n'a pas fonctionné.
          console.log(msg);
        }
      );
    };
  }]);
