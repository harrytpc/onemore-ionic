angular.module('starter.services')

.factory('RelationshipService', function($http, $rootScope, $timeout, $localStorage) {
	var RelationshipService = {};
	

	RelationshipService.find = function(following) {
		return $http.get($rootScope.baseUrlBackend + '/relationships?following=' + following);
	};

	RelationshipService.follow = function(userIdFollowed) {

		var relationShip = {};
		relationShip.followed = {};
		relationShip.followed.id = userIdFollowed;
		
		return $http.post($rootScope.baseUrlBackend + '/relationships/follow', relationShip);
	};

	RelationshipService.unfollow = function(userIdFollowed) {

		// var relationShip = {};
		// relationShip.followed = {};
		// relationShip.followed.id = userIdFollowed;
		
		return $http.delete($rootScope.baseUrlBackend + '/relationships/unfollow?userIdFollowed=' + userIdFollowed);
	};


 	return RelationshipService;

});

