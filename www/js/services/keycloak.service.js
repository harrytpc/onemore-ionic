angular.module('starter.services')

.factory('KeycloakService', function($http, $rootScope, $timeout, $localStorage) {
	var KeycloakService = {};
	
	KeycloakService.token = function(code) {
		return $http({
	        url: $rootScope.baseUrlSSO + '/protocol/openid-connect/token',
	        method: "POST",
	        data: 'grant_type=authorization_code&code='+code+'&client_id=onemoreapp&redirect_uri=http://localhost/callback',
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    	})
			.success(function(data) {
				$localStorage.jwt = data;
	    		return data;
			})
	    	.error(function(data) {
	    		console.log ("erro ao recuperar token")
	    		return null;
	    	});

	};

	KeycloakService.login = function() {
		return $http({
	        url: $rootScope.baseUrlSSO + '/protocol/openid-connect/token',
	        method: "POST",
	        data: 'grant_type=password&username=teste01@teste.com&password=123456&client_id=onemoreapp',
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    	})
			.success(function(data) {
	    		$localStorage.jwt = data;
					return data;
			})
	    	.error(function(data) {
	    		console.log ("erro ao recuperar token")
	    		return null;
	    	});

	};

	KeycloakService.refresh = function() {
		return $http({
	        url: $rootScope.baseUrlSSO + '/protocol/openid-connect/token',
	        method: "POST",
	        data: 'grant_type=refresh_token&refresh_token='+$localStorage.jwt.refresh_token+'&client_id=onemoreapp',
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    	})
			.success(function(data) {
	    		$localStorage.jwt = data;
			})
	    	.error(function(data) {
	    		console.log ("erro ao fazer refresh do token")
	    		return null;
	    	});

	};

	KeycloakService.logoff = function() {
		return $http({
	        url: $rootScope.baseUrlSSO + '/protocol/openid-connect/logout',
	        method: "POST",
	        data: 'refresh_token='+$localStorage.jwt.refresh_token+'&client_id=onemoreapp',
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    	})
			.success(function(data) {
					$localStorage.jwt = null;
	    		return data;
			})
	    	.error(function(data) {
	    		console.log ("erro ao fazer logoff")
	    		return null;
	    	});
	};

	KeycloakService.userInfo = function() {
		return $http({
	        url: $rootScope.baseUrlSSO + '/account',
	        method: "GET",
	        headers: {'Accept': 'application/json', 'Authorization' : 'Bearer ' + $localStorage.jwt.access_token}
	    	})
			.success(function(data) {
	    		return data;
			})
	    	.error(function(data) {
	    		console.log ("erro ao recuperar dados do usuario")
	    		return null;
	    	});
	};
 

 	return KeycloakService;

});

