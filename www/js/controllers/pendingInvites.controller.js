angular.module('starter.controllers')

.controller('PendingInvitesCtrl', function($scope, $ionicModal, $timeout, $rootScope, EventService) {
	$scope.findEvents=findEvents;
  	

 	findEvents();

	function findEvents() {
		EventService.find()
      .success(function (data) {
        $scope.events = data;
      })
      .error(function (error) {
        alert('Ocorreu um erro ao recuperar os eventos');
      });
	};

 

});
