angular.module('starter.services')

.factory('EventService', function($http, $rootScope, $timeout, $localStorage) {
	var EventService = {};
	
	EventService.find = function() {
		return $http({
	        url: $rootScope.baseUrlBackend + '/events',
	        method: "GET",
	        headers: {'Accept': 'application/json'}
	    	})
			.success(function(data) {
	    		return data;
			})
	    	.error(function(data) {
	    		console.log ("erro ao recuperar eventos")
	    		return null;
	    	});
	};
 

 	return EventService;

});

