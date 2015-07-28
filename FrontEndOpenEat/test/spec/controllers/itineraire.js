'use strict';

describe('Controller: ItineraireCtrl', function () {

  // load the controller's module
  beforeEach(module('frontEndOpenEatApp'));

  var ItineraireCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItineraireCtrl = $controller('ItineraireCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ItineraireCtrl.awesomeThings.length).toBe(3);
  });
});
