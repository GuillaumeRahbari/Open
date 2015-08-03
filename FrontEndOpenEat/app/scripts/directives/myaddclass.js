'use strict';

/**
 * Directive permettant d'ajouter une classe à un élement A lorsque l'on clique sur un élement B.
 * Utilisation :
 * <ul>
 *     <li>Placer la directive <i>my-add-class</i> sur l'élement B.</li>
 *     <li>Ajouter l'attribut <i>target="nomElement"</i> à l'élement B.</li>
 *     <li>Ajouter l'attribut <i>class-toggle="nomClass"</i> à l'élement B.</li>
 * </ul>
 *
 * @ngdoc directive
 * @name frontEndOpenEatApp.directive:myAddClass
 * @description
 * # myAddClass
 */
angular.module('frontEndOpenEatApp')
  .directive('myAddClass', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('click', function () {
          angular.element(attrs.myTarget).addClass(attrs.classToggle);
        })
      }
    };
  });
