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

        var travelMode = 'Driving'; // Une variable retenant le mode courant utilis� pour voyager.

        /**
         * Une fonction getter-setter sur la variable travelMode.
         * @param {String} newTravelMode - La nouvelle valeur de travelMode souhait�e.
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
         * Permet de faire apparaitre ou disparaitre les marqueurs des magasins choisis sur la carte.
         * La variable <i>$scope.checked</i> n'est cr��e que dans le but de pouvoir �tre watch dans le controller {@link map}.
         * @param {boolean} checked - Permet de savoir si l'utilisateur a coch� la case ou non.
         */
        $scope.toggleShops = function (checked) {
            $scope.checked = checked; // Une variable permettant de voir si l'utilisateur a coch� la case des magasins.
            if (checked) {
                createMarkersForShops($scope.shops);
            }
        };

        /**
         * Permet de cr�er un marqueur par magasin.
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
         * On utilise le service {@link services/shops} pour r�cup�rer les magasins.
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
         * Cette fonction permet de d�marrer la naviguation.
         * La naviguation ne se lance que dans le cas o� l'utilisateur � coch� l'affichage des magasins,
         * dans ce cas on broadcast l'event <i>calculRoute</i>.
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
                /**
                 * Indique aux fonctions qui �coutent cet event qu'elles peuvent lancer le calcul d'une route.
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
