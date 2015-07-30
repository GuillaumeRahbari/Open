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
            alert('entrée');

            $ionicLoading.show({
               template:'<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
            });

            $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true}).then(
                function (position){
                    alert('localisation réussi');
                    var mapOptions = {
                        zoom: 18,
                        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                    };

                    map = new google.maps.Map(document.getElementById('map-canvas'),
                        mapOptions);

                    $ionicLoading.hide();
                },
                function (msg) {
                    alert('localisation fail');
                    $ionicLoading.hide();
                    alert(msg.toString);
                }
            );
        }
        
        initialize();

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
