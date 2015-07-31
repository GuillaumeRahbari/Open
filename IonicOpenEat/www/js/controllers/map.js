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
        /**
         * Initialisation de la carte google map.
         */
        function initialize () {
            $ionicLoading.show({
               template:'<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
            });

            $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true}).then(
                function (position){
                    var mapOptions = {
                        zoom: 18,
                        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                    };

                    map = new google.maps.Map(document.getElementById('map-canvas'),
                        mapOptions);

                    $ionicLoading.hide();
                },
                function (msg) {
                    $ionicLoading.hide();
                    console.log(msg);
                }
            );
        }

        initialize();

        /**
         * Chargement des magasins.
         */
        shops.getShops().then(
            function (data){
                createMarkersForShops(data);
            }, function (msg) {
                console.log(msg);
            }
        );

        /**
         * Permet de récupérer les marqueurs
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
                var gMarker = new google.maps.Marker(marker);
                gMarker.setAnimation(google.maps.Animation.DROP);
                gMarker.setMap(map);
                markers.push(gMarker);
            }
            $scope.shopMarkers = markers;
        };

    }]);
