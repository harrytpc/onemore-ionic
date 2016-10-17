angular.module('starter.controllers')

.controller('EventsCtrl', function($scope, $ionicModal, $timeout, $rootScope, $http, EventService) {


	$scope.findEvents=findEvents;

	$scope.teste='tdsfsfsdfsd';
 	

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
