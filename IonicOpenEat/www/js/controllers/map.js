'use strict';

/**
 * @ngdoc function
 * @name starter.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the starter
 */
angular.module('starter')
    .controller('MapCtrl', ['$scope', 'location', 'shops', '$cordovaGeolocation',  function ($scope, location, shops, $cordovaGeolocation) {

        var map;
        /**
         * Initialisation de la carte google map.
         */
        function initialize () {

            $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true}).then(
                function (position){
                    var mapOptions = {
                        zoom: 18,
                        center: new google.maps.LatLng(position.latitude, position.longitude)
                    };

                    map = new google.maps.Map(document.getElementById('map-canvas'),
                        mapOptions);
                },
                function (msg) {
                    alert(msg);
                }
            );

        }

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

        google.maps.event.addDomListener(window, 'load', initialize);

    }]);
