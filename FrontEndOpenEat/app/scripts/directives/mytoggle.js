'use strict';

/**
 * Directive permettant de toggle une classe à un élement A lorsque l'on clique sur un élement B.
 * Utilisation :
 * <ul>
 *     <li>Placer la directive <i>my-toggle</i> sur l'élement B.</li>
 *     <li>Ajouter l'attribut <i>target="nomElement"</i> à l'élément B.</li>
 *     <li>Ajouter l'attribut <i>class-toggle="nomClass" à l'élément B</i>.</li>
 * </ul>
 *
 * @ngdoc directive
 * @name frontEndOpenEatApp.directive:myToggle
 * @description
 * # myToggle
 */
angular.module('frontEndOpenEatApp')
  .directive('myToggle', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('click', function () {
          angular.element(attrs.target).toggleClass(attrs.classToggle);
        })
      }
    };
  });
