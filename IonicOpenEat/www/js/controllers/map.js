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
