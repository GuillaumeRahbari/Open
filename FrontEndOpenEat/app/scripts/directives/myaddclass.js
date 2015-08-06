'use strict';

/**
 * Directive permettant d'ajouter une classe à un élement A lorsque l'on clique sur un élement B.
 * Utilisation :
 * <ul>
 *     <li>Placer la directive <i>my-add-class</i> sur l'élement B.</li>
 *     <li>Ajouter l'attribut <i>my-target="nomElement"</i> à l'élement B.</li>
 *     <li>Ajouter l'attribut <i>class-add="nomClass"</i> à l'élement B.</li>
 * </ul>
 *
 * @example <UneBalise my-add-class my-target="#AnOtherBalise" class-add=".show"></UneBalise>
 * <div id="AnOtherBalise">Hello World</div>
 * Lorsque l'on clique sur la balise <i>UneBalise</i> cela va ajouter la class ".show" sur l'élément
 * ayant l'id <i>AnOtherBalise</i>
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
          angular.element(attrs.myTarget).addClass(attrs.classAdd);
        });
      }
    };
  });
