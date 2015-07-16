'use strict';

describe('Controller: MapCtrl', function () {

  // load the controller's module
  beforeEach(module('frontEndOpenEatApp'));

  var MapCtrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    MapCtrl = $controller('MapCtrl', {
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MapCtrl.awesomeThings.length).toBe(3);
  });
});
