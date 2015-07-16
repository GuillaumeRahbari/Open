'use strict';

describe('Controller: FooterCtrl', function () {

  // load the controller's module
  beforeEach(module('frontEndOpenEatApp'));

  var FooterCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    FooterCtrl = $controller('FooterCtrl', {
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FooterCtrl.awesomeThings.length).toBe(3);
  });
});
