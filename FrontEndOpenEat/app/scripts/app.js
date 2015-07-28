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
    'ngTouch'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings'
      })
      .when('/itineraire', {
        templateUrl: 'views/itineraire.html',
        controller: 'ItineraireCtrl',
        controllerAs: 'itineraire'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);
