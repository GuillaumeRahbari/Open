'use strict';

/**
 * @ngdoc function
 * @name starter.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the starter
 */
angular.module('starter')
    .controller('MapCtrl', ['$scope', 'shops', '$cordovaGeolocation', '$ionicLoading',  function ($scope, shops, $cordovaGeolocation, $ionicLoading) {

        var map;
        var directionsDisplay; // Permet d'aficher sur la carte.
        var directionsService = new google.maps.DirectionsService(); // Permet de faire le calcul d'un itinéraire.
        /**
         * Initialisation de la carte google map.
         */
        function initialize () {
            $ionicLoading.show({
               template:'<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
            });

            $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true}).then(
                function (position){
                    directionsDisplay = new google.maps.DirectionsRenderer();
                    var mapOptions = {
                        zoom: 18,
                        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                    };

                    map = new google.maps.Map(document.getElementById('map-canvas'),
                        mapOptions);

                    directionsDisplay.setMap(map);

                    $ionicLoading.hide();
                },
                function (msg) {
                    $ionicLoading.hide();
                    console.log(msg);
                }
            );
        }

        initialize();

        // Permet de voir quand la variable est modifié.
        $scope.$parent.$watch('checked', updateShopsMarkers);

        /**
         * Permet d'update les markers des magasins choisis.
         */
        function updateShopsMarkers (){
            if (!$scope.$parent.checked){
                $scope.$parent.shopMarkers.forEach(function (marker) {
                    var currentMarker = marker;
                    currentMarker.setMap(null);
                    google.maps.event.clearInstanceListeners(currentMarker, 'click');
                });
            }
            else {
                $scope.$parent.shopMarkers.forEach(function (marker) {
                    var currentMarker = marker;
                    currentMarker.setAnimation(google.maps.Animation.DROP);

                    var infowindow = new google.maps.InfoWindow({
                        content: currentMarker.title
                    });

                    attachListener(currentMarker, infowindow);
                    currentMarker.setMap(map);
                });
            }
        }

        /**
         * Permet d'ajouter un listener click sur les markers.
         * @param marker
         * @param infowindow
         */
        function attachListener (marker, infowindow){
            google.maps.event.addListener( marker, 'click', function(){
                // Dans le cas où on on veut afficher des infos sur le marker.
                map.panTo(marker.getPosition());
                infowindow.open(map,marker);
            });
        }

        /**
         * Cette fonction permet de calculer un itinéraire avec des waypoints.
         * Ici le point de départ et d'arrivé sont les mêmes (la position actuelle).
         * Ici les waypoints sont les magasins choisis par l'utilisateur.
         * Une fois le calcul de la route effectué, une mise à jour de la carte est faite pour visualiser l'itinéraire.
         */
        function calcRoute () {
            $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true}).then(
                function (position) {
                    var currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    var start = currentPosition;
                    var end = currentPosition;
                    var waypts = [];
                    var currentMarker;
                    $scope.$parent.shopMarkers.forEach(function (marker) {
                        currentMarker = marker;
                        waypts.push({
                            location: currentMarker.getPosition(),
                            stopover: true
                        });
                    });
                    var request = {
                        origin: start,
                        destination: end,
                        waypoints: waypts,
                        optimizeWaypoints: true,
                        travelMode: google.maps.TravelMode[$scope.$parent.travelMode().toUpperCase()]
                    };

                    directionsService.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                        }
                    });
                },
                function (msg){
                    console.log(msg);
                }
            );
        }

        // Ecoute de l'événement calculRoute. Si l'événement est déclenché alors on appelle la fonction calcRoute.
        $scope.$on('calculRoute', calcRoute);

    }]);
