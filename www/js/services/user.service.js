angular.module('starter.services')

.factory('UserService', function($http, $rootScope, $timeout) {
	var UserService = {};
	
	UserService.login = function(username, password) {
		return $http.get($rootScope.baseUrl + '/modalities');
	};
 

 	return UserService;

});
