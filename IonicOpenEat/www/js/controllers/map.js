'use strict';

/**
 * @ngdoc function
 * @name starter.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the starter
 */
angular.module('starter')
    .controller('MapCtrl', ['$scope',  function ($scope) {

        var map;
        /**
         * Initialisation de la carte google map.
         */
        function initialize () {
            var mapOptions = {
                zoom: 18,
                center: new google.maps.LatLng(48.8879996, 2.2882407)
            };

            map = new google.maps.Map(document.getElementById('map-canvas'),
                mapOptions);

        }
        initialize();

    }]);
