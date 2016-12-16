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


	function pad(n) {
    	return (n < 10) ? ("0" + n) : n;
  	}

	EventService.filter = function(filter) {
		var url = $rootScope.baseUrlBackend + '/events?'; 
		
		if(filter.name){
			url += 'name='+filter.name+'&';
		}

		if(filter.id){
			url += 'id='+filter.id+'&';
		}

		if(filter.date){
			var dateStr = pad(filter.date.getDate()) + '-' + pad(filter.date.getMonth()+1) + '-' + filter.date.getFullYear();
			
			url += 'date='+dateStr+'&';	
		}

		if(filter.state && filter.state.id){
			url += 'stateId='+filter.state.id+'&';
		}
		
		if(filter.city && filter.city.id){
			url += 'cityId='+filter.city.id+'&';
		}


		if(filter.modality && filter.modality.id){
			url += 'modalityId='+filter.modality.id+'&';
		}

		return $http({
	        url: url,
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


	EventService.findToAdmin = function() {
		return $http({
	        url: $rootScope.baseUrlBackend + '/events?userOwner=true',
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

	EventService.getInvitations = function(eventId) {
		return $http({
	        url: $rootScope.baseUrlBackend + '/events/' + eventId + '/invitations' ,
	        method: "GET",
	        headers: {'Accept': 'application/json'}
	    	})
			.success(function(data) {
	    		return data;
			})
	    	.error(function(data) {
	    		console.log ("erro ao recuperar convites")
	    		return null;
	    	});
	};
	
 

	EventService.insert = function(event) {
		return $http.post($rootScope.baseUrlBackend + '/events', JSON.stringify(event));
	};

	EventService.update = function(event) {
		return $http.put($rootScope.baseUrlBackend + '/events/' + event.id, JSON.stringify(event));
	};

	EventService.invite = function(eventId, users) {
		return $http.post($rootScope.baseUrlBackend + '/events/'+eventId+'/invite' , JSON.stringify(users));
	};

	EventService.request = function(eventId) {
		return $http.post($rootScope.baseUrlBackend + '/events/' + eventId + '/request');
	};


	EventService.getById = function(eventId) {
		return $http.get($rootScope.baseUrlBackend + '/events/' + eventId);
	};


 	return EventService;

});

