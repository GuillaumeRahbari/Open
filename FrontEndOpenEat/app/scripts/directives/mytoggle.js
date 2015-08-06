'use strict';

/**
 * Directive permettant de toggle une classe à un élement A lorsque l'on clique sur un élement B.
 * Utilisation :
 * <ul>
 *     <li>Placer la directive <i>my-toggle</i> sur l'élement B.</li>
 *     <li>Ajouter l'attribut <i>my-target="nomElement"</i> à l'élément B.</li>
 *     <li>Ajouter l'attribut <i>class-toggle="nomClass" à l'élément B</i>.</li>
 * </ul>
 *
 * @example <UneBalise my-add-class my-target="#AnOtherBalise" class-toggle=".show"></UneBalise>
 * <div id="AnOtherBalise">Hello World</div>
 * Lorsque l'on clique sur la balise <i>UneBalise</i> cela va toggle la class ".show" sur l'élément
 * ayant l'id <i>AnOtherBalise</i>
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
          angular.element(attrs.myTarget).toggleClass(attrs.classToggle);
        })
      }
    };
  });
