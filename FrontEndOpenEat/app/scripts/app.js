'use strict';

/**
 * @ngdoc overview
 * @name frontEndOpenEatApp
 * @description
 * # frontEndOpenEatApp
 *
 * Main module of the application.
 */
angular
  .module('frontEndOpenEatApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps'
  ])
  .config(['$routeProvider', 'uiGmapGoogleMapApiProvider', function ($routeProvider, uiGmapGoogleMapApiProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });

    uiGmapGoogleMapApiProvider.configure({
      v: '3.20',
      libraries: 'weather,geometry,visualization',
      signed_in :true
    });

  }]);
