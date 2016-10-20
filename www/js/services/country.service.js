angular.module('starter.services')

.factory('CountryService', function($http, $rootScope, $timeout) {
	var CountryService = {};
	
	CountryService.findCountries = function() {
		return $http.get($rootScope.baseUrlBackend + '/countries');
	};

	CountryService.findStatesByCountryId = function(countryId) {
		return $http.get($rootScope.baseUrlBackend + '/countries/' + countryId + "/states");
	};
 
 	return CountryService;

});
