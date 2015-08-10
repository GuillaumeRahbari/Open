'use strict';

/**
 * @ngdoc service
 * @name starter.constant:constants
 * @description
 * # constants
 * Constant in the frontEndOpenEatApp.
 */
angular.module('starter')
    .constant('constants', {
        backendUrl: 'http://10.170.2.96:3000/', // dev
        markerBlue : '/images/marker-blue.png',
        googleMap : {
            ios : {
                scheme: 'comgooglemaps://',
                url: 'comgooglemaps://'
            },
            android : {
                scheme: 'com.google.android.apps.maps',
                url: 'google.navigation:q='
            }
        }
    });
