angular.module('starter.services')

.factory('UserService', function($http, $rootScope, $timeout, $localStorage) {
	var UserService = {};
	
	UserService.findUserNotFollowing = function() {
		return $http.get($rootScope.baseUrlBackend + '/users?notFollowing=true');
	};

	UserService.check = function(object) {
		return $http({
	        url: $rootScope.baseUrlBackend + '/users/check',
	        method: "POST",
	        // skipAuthorization: true,
	        headers: {'Accept': 'application/json'},
	        data: object
	    	})
			.success(function(data) {
	    		return data;
			})
	    	.error(function(data) {
	    		console.log ("erro ao checkar usuario")
	    		return null;
	    	});
	};
 

 	return UserService;

});

