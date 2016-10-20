angular.module('starter.controllers')

.controller('ViewEventCtrl', function($http, $scope, $ionicModal, $timeout, $rootScope, $stateParams, EventService) {

	$scope.eventId = $stateParams.eventId;

	$scope.findEvent=findEvent;

 	findEvent();

	function findEvent() {
		EventService.getById($scope.eventId)
			.success(function (data) {
          $scope.event = data;
        })
        .error(function (error) {
          $scope.status = 'Erro ao recuperar o evento';
          console.log($scope.status);
        });
	};
 

});
