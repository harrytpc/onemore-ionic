angular.module('starter.services')

.factory('InvitationService', function($http, $rootScope, $timeout, $localStorage) {
	var InvitationService = {};

	InvitationService.cancelInvitation = function(invitationId) {
		return $http.delete($rootScope.baseUrlBackend + '/invitations/' + invitationId);
	};


	InvitationService.answerInvitation = function(invitationId, answer) {
		if (answer == true){
      		return $http.post($rootScope.baseUrlBackend + '/invitations/' + invitationId + '/accept');
	    }else{
			return $http.post($rootScope.baseUrlBackend + '/invitations/' + invitationId + '/deny');
	    }
	};

	InvitationService.getConfirmeds = function(eventId) {
		return $http.get($rootScope.baseUrlBackend + '/events/' + eventId + '/confirmeds');
	};

	InvitationService.getInviteds = function(eventId) {
		return $http.get($rootScope.baseUrlBackend + '/events/' + eventId + '/inviteds');
	};

	InvitationService.getPendingApproval = function(eventId) {
		return $http.get($rootScope.baseUrlBackend + '/events/' + eventId + '/pendings');
	};

	InvitationService.getDeclined = function(eventId) {
		return $http.get($rootScope.baseUrlBackend + '/events/' + eventId + '/declineds');
	};

 	return InvitationService;

});

