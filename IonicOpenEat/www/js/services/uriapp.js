'use strict';

/**
 * @ngdoc service
 * @name starter.factory:.uriapp
 * @description
 * # uriapp
 * Factory in the starter.
 */
angular.module('starter')
    .factory('uriapp', ['$q', 'constants', '$cordovaDevice', '$cordovaAppAvailability', function ($q, constants, $cordovaDevice,  $cordovaAppAvailability) {

        // Public API here
        return {
            getUriApp: function (application) {
                var app;
                var scheme;
                var url;
                var deferred = $q.defer();
                switch (application) {
                    case 'GoogleMap':
                        app = constants.googleMap;
                        break;
                }
                switch ($cordovaDevice.getPlatform()){
                    case 'iOS':
                        scheme = app.ios.scheme;
                        url = app.ios.url;
                        break;
                    case 'Android':
                        scheme = app.android.scheme;
                        url = app.android.url;
                        break;
                }

                $cordovaAppAvailability.check(scheme).then(
                    function () {
                        deferred.resolve(url);
                    },
                    function () {
                        deferred.reject('application not available');
                    }
                );
                return deferred.promise;

            }
        };
    }]);
