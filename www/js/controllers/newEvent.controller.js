angular.module('starter.controllers')

.controller('NewEventCtrl', function($scope, $ionicModal, $timeout, $rootScope, ModalityService) {

	$scope.findEvent = findEvent;
	findEvent();

	$scope.newEvent = {};
	$scope.newEvent.date = new Date();
 
	function findEvent() {

		ModalityService.findModality()
			.success(function (data) {
                $scope.modalities = data;
            })
            .error(function (error) {
                $scope.status = 'Unable to load modalities data: ' + error.message;
                alert('Erro ao pesquisar modalidades');
            });

		// .then(
		// 	function(data) {
		// 		$scope.modalities = data;
		// 		// $scope.pages = new Array(data.totalPages);
		// 	}, function() {
		// 		alert('Erro ao pesquisar modalidades');
		// 	});
	}


});
