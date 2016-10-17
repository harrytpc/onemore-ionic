angular.module('starter.controllers')

.controller('ViewEventCtrl', function($http, $scope, $ionicModal, $timeout, $rootScope, $stateParams) {

	$scope.eventId = $stateParams.eventId;

	$scope.findEvent=findEvent;

 	findEvent();

	function findEvent() {
		$http.get($rootScope.baseUrl + '/events/' + $scope.eventId)
			.success(function(data) {
				$scope.selectedEvent = data;
			})
			.error(function(data, status) {
				//console.error('Repos error', status, data);
				$scope.teste = 'erro';
			});
		
	};
 

});
