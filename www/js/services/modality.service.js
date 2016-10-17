angular.module('starter.services')

.factory('ModalityService', function($http, $rootScope, $timeout) {
	var ModalityService = {};
	
	ModalityService.findModality = function() {
		return $http.get($rootScope.baseUrlBackend + '/modalities');
	};
 

 	return ModalityService;

});
