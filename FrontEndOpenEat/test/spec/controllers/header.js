'use strict';

describe('Controller: HeaderCtrl', function () {

  // load the controller's module
  beforeEach(module('frontEndOpenEatApp'));

  var HeaderCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    HeaderCtrl = $controller('HeaderCtrl', {
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HeaderCtrl.awesomeThings.length).toBe(3);
  });
});
