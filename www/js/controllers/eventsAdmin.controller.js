angular.module('starter.controllers')

.controller('EventsAdminCtrl', function($scope, $ionicModal, $timeout, $rootScope, EventService) {

	$scope.findEventsToAdmin=findEventsToAdmin;

	findEventsToAdmin();

	function findEventsToAdmin() {
		EventService.findToAdmin()
	      .success(function (data) {
	        $scope.events = data;
	      })
	      .error(function (error) {
	        alert('Ocorreu um erro ao recuperar os eventos');
	      });
	};
 

});

