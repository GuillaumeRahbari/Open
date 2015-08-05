'use strict';

/**
 * @ngdoc service
 * @name starter.factory:.uriapp
 * @description
 * # uriapp
 * Factory in the starter.
 */
angular.module('starter')
    .factory('uriapp', function () {
        // Service logic
        // ...

        var meaningOfLife = 42;

        // Public API here
        return {
            someMethod: function () {
                return meaningOfLife;
            }
        };
    });
