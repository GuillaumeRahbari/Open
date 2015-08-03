'use strict';

/**
 * @ngdoc function
 * @name starter.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the starter
 */
angular.module('starter')
    .controller('MainCtrl', ['$scope', 'shops', function ($scope, shops) {

        $scope.checked; // Une variable permettant de voir si l'utilisateur a coché la case des magasins.

        /**
         * Permet de faire apparaitre ou disparaitre les magasins de la carte.
         * @param checked Permet de savoir si l'utilisateur a coché la case ou non.
         */
        $scope.toggleShops = function (checked) {
            $scope.checked = checked;
            if (checked) {
                createMarkersForShops($scope.shops);
            }
        };

        /**
         * Permet de créer les marqueurs
         * @param shops
         */
        var createMarkersForShops = function (shops){
            var markers = [];
            for (var shop in shops) {
                var marker = {
                    position : new google.maps.LatLng(shops[shop].latitude,shops[shop].longitude),
                    title : shops[shop].description,
                    zIndex : shops[shop].id
                };
                markers.push(new google.maps.Marker(marker));
            }
            $scope.shopMarkers = markers;
        };

        /**
         * Chargement des magasins.
         */
        shops.getShops().then(
            function (data){
                $scope.shops = data;
            }, function (msg) {
                console.log(msg);
            }
        );

    }]);
