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

        // Permet de voir quand la variable est modifié.
        $scope.$parent.$watch('checked', updateShopsMarkers);

        /**
         * Permet d'update les markers des magasins choisis.
         */
        function updateShopsMarkers (){
            if (!$scope.$parent.checked){
                for (var marker in $scope.$parent.shopMarkers){
                    var currentMarker = $scope.$parent.shopMarkers[marker];
                    currentMarker.setMap(null);
                    google.maps.event.clearInstanceListeners(currentMarker, 'click');
                }
            }
            else {
                for (var marker in $scope.$parent.shopMarkers){
                    var currentMarker = $scope.$parent.shopMarkers[marker];
                    currentMarker.setAnimation(google.maps.Animation.DROP);

                    var infowindow = new google.maps.InfoWindow({
                        content: currentMarker.title
                    });

                    attachListener(currentMarker, infowindow);
                    currentMarker.setMap(map);
                }
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

    }]);
