'use strict';

describe('Directive: myToggle', function () {

  // load the directive's module
  beforeEach(module('frontEndOpenEatApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-toggle></my-toggle>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myToggle directive');
  }));
});
