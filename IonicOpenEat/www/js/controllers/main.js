'use strict';

/**
 * @ngdoc function
 * @name starter.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the starter
 */
angular.module('starter')
    .controller('MainCtrl', ['$scope', 'shops', '$ionicPopup', function ($scope, shops, $ionicPopup) {

        $scope.checked; // Une variable permettant de voir si l'utilisateur a coch� la case des magasins.
        var travelMode = 'Driving'; // Une variable retenant le mode courant de travel.

        /**
         * Une fonction getter-setter sur la variable travelMode.
         * @param newTravelMode La nouvelle valeur de travelMode souhait�e.
         * @returns
         * <ul>
         *     <li>Si arguments.length est �gale � 0 (pas de param�tre) alors cela renvoie travelMode (�quivalent � un get)</li>
         *     <li>Si arguments.length est diff�rent de 0 (il y a un param�tre) alors la fonction affecte la nouvelle valeur � travelMode
         *     et renvoie travelMode (�quivalent � un set suivi d'un get)</li>
         * </ul>
         */
        $scope.travelMode = function (newTravelMode) {
            return arguments.length ? (travelMode = newTravelMode) : travelMode;
        };

        /**
         * Permet de faire apparaitre ou disparaitre les magasins de la carte.
         * @param checked Permet de savoir si l'utilisateur a coch� la case ou non.
         */
        $scope.toggleShops = function (checked) {
            $scope.checked = checked;
            if (checked) {
                createMarkersForShops($scope.shops);
            }
        };

        /**
         * Permet de cr�er les marqueurs
         * @param shops
         */
        var createMarkersForShops = function (shops) {
            var markers = [];
            for (var shop in shops) {
                var marker = {
                    position: new google.maps.LatLng(shops[shop].latitude, shops[shop].longitude),
                    title: shops[shop].description,
                    zIndex: shops[shop].id
                };
                markers.push(new google.maps.Marker(marker));
            }
            $scope.shopMarkers = markers;
        };

        /**
         * Chargement des magasins.
         */
        shops.getShops().then(
            function (data) {
                $scope.shops = data;
            }, function (msg) {
                console.log(msg);
            }
        );

        /**
         * Cette fonction permet de d�marrer la naviguation.
         * La naviguation ne se lance que dans le cas o� l'utilisateur � coch� l'affichage des magasins.
         * Sinon une popup se lance le pr�venant que les magasins n'ont pas �t� coch�s.
         */
        $scope.launchNavigation = function () {
            if (!$scope.checked) {
                $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Veuillez afficher les magasins'
                });
            }
            else{
                $scope.$broadcast('calculRoute');
            }
        };

    }]);
