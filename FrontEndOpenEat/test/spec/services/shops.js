'use strict';

describe('Service: shops', function () {

  // load the service's module
  beforeEach(module('frontEndOpenEatApp'));

  // instantiate service
  var shops;
  beforeEach(inject(function (_shops_) {
    shops = _shops_;
  }));

  it('should do something', function () {
    expect(!!shops).toBe(true);
  });

});
