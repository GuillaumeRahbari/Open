'use strict';

describe('Service: shops', function () {

  // load the service's module
  beforeEach(module('frontEndOpenEatApp'));

  // instantiate service
  var shops, $httpBackend;
  beforeEach(inject(function (_shops_, _$httpBackend_) {
    shops = _shops_;
    $httpBackend = _$httpBackend_;
  }));

  describe ('shops.getShops', function(){

    var callbacks;

    beforeEach(function () {
      callbacks = {
        success: function (data) {},
        error: function (data) {}
      };
      spyOn(callbacks, 'success').and.callThrough();
      spyOn(callbacks, 'error').and.callThrough();
    });

    it('should get shops from the service', function() {
      var mockResult = { status: 'success',
        data: [ {
          id: 2,
          latitude: '48.889042',
          longitude: '2.2883',
          description: 'Resto 2',
          id_user: null
        }, {
          id: 1,
          latitude: '48.8879996',
          longitude: '2.2882407',
          description: 'Resto 1',
          id_user: null
        } ]
      };

      $httpBackend.when('GET', 'http:://localhost:3000/shops/')
        .respond(mockResult);

      $httpBackend.expectGET('http://localhost:3000/shops/');

      shops.getShops().then(callbacks.success, callbacks.error);
      $httpBackend.flush();

      expect(callbacks.success).toHaveBeenCalled();
      expect(callbacks.error).not.toHaveBeenCalled();
      expect(callbacks.success.calls.argsFor(0)).toEqual([mockResult.data]);

    });

  });

  it('should do something', function () {
    expect(!!shops).toBe(true);
  });

});
