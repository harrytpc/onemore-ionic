angular.module('starter.services')

.factory ('StorageService', function ($localStorage) {
	
	$localStorage = $localStorage.$default({
	  things: []
	});
	
	var StorageService = {};

	StorageService.getAll = function () {
	  return $localStorage.things;
	};
	
	StorageService.add = function (obj) {
	  $localStorage.things.push(obj);
	}
	
	StorageService.remove = function (thing) {
	  $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
	}
	
	return StorageService;

})
