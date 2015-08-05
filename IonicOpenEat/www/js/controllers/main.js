'use strict';

/**
 * @ngdoc function
 * @name starter.controller:MainCtrl
 * @description C'est le controlleur principale de l'application.
 * # MainCtrl
 * Controller of the starter
 */
angular.module('starter')
    .controller('MainCtrl', ['$scope', 'shops', '$ionicPopup', 'uriapp', function ($scope, shops, $ionicPopup, uriapp) {

        var travelMode = 'Driving'; // Une variable retenant le mode courant utilisé pour voyager.

        /**
         * Une fonction getter-setter sur la variable travelMode.
         * @param {String} newTravelMode - La nouvelle valeur de travelMode souhaitée.
         * @returns
         * <ul>
         *     <li>Si arguments.length est égale à 0 (pas de paramètre) alors cela renvoie travelMode (équivalent à un get)</li>
         *     <li>Si arguments.length est différent de 0 (il y a un paramètre) alors la fonction affecte la nouvelle valeur à travelMode
         *     et renvoie travelMode (équivalent à un set suivi d'un get)</li>
         * </ul>
         */
        $scope.travelMode = function (newTravelMode) {
            return arguments.length ? (travelMode = newTravelMode) : travelMode;
        };

        /**
         * Permet de faire apparaitre ou disparaitre les marqueurs des magasins choisis sur la carte.
         * La variable <i>$scope.checked</i> n'est créée que dans le but de pouvoir être watch dans le controller {@link map}.
         * @param {boolean} checked - Permet de savoir si l'utilisateur a coché la case ou non.
         */
        $scope.toggleShops = function (checked) {
            $scope.checked = checked; // Une variable permettant de voir si l'utilisateur a coché la case des magasins.
            if (checked) {
                createMarkersForShops($scope.shops);
            }
        };

        /**
         * Permet de créer un marqueur par magasin.
         * @param {Object} shops - Une liste de magasin
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
         * On utilise le service {@link services/shops} pour récupérer les magasins.
         * On les stocke ensuite dans la variable <i>$scope.shops</i>
         */
        shops.getShops().then(
            function (data) {
                $scope.shops = data;
            }, function (msg) {
                console.log(msg);
            }
        );

        /**
         * Cette fonction permet de démarrer la naviguation.
         * La naviguation ne se lance que dans le cas où l'utilisateur à coché l'affichage des magasins,
         * dans ce cas on broadcast l'event <i>calculRoute</i>.
         * Sinon une popup se lance le prévenant que les magasins n'ont pas été cochés.
         */
        $scope.launchNavigation = function () {
            if (!$scope.checked) {
                $ionicPopup.alert({
                    title: 'Erreur',
                    template: 'Veuillez afficher les magasins'
                });
            }
            else{
                /**
                 * Indique aux fonctions qui écoutent cet event qu'elles peuvent lancer le calcul d'une route.
                 * @event calculRoute
                 */
                $scope.$broadcast('calculRoute');
            }
        };

        /**
         * Cette fonction permet le lancement d'une application tierce depuis notre application.
         * @param {String} application - Le nom de l'application que l'on souhaite lancer.
         */
        $scope.launchApp = function (application) {

            uriapp.getUriApp(application).then(
                function (url) {
                    window.open('geo:37.7749,-122.4194', '_system', 'location=no');
                },
                function (msg) {
                    alert(msg);
                }
            );
        };

    }]);
