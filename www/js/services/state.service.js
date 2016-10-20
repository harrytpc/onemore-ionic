angular.module('starter.services')

.factory('StateService', function($http, $rootScope, $timeout) {
	var StateService = {};
	

	StateService.findStates = function() {
		return $http.get($rootScope.baseUrlBackend + '/states');
	};

	StateService.findCitiesByStateId = function(stateId) {
		return $http.get($rootScope.baseUrlBackend + '/states/' + stateId + "/cities");
	};
 
 	return StateService;

});
