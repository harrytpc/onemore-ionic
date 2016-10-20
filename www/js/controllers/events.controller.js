angular.module('starter.controllers')

.controller('EventsCtrl', function($scope, $ionicModal, $timeout, $rootScope, $http, EventService, $ionicPopup, ModalityService) {


  $scope.findEvents=findEvents;
  $scope.solicitation = solicitation;
  $scope.filter = filter;
  $scope.clearFilter = clearFilter;

	$scope.teste='tdsfsfsdfsd';
 	
  init();

  function init(){
    findEvents();
    findModalities() ;
  }
  function findModalities(){
    ModalityService.findModality()
      .success(function (data) {
        $scope.filter.modalities = data;
      })
      .error(function (error) {
        $scope.status = 'Erro ao pesquisar modalidades';
        console.log($scope.status);
      });
  }

  function clearFilter(){
    $scope.filter.event = {};
    filter();
  }

 	

	function findEvents() {
		EventService.find()
      .success(function (data) {
        $scope.events = data;
        $scope.$broadcast('scroll.refreshComplete');
      })
      .error(function (error) {
        alert('Ocorreu um erro ao recuperar os eventos');
      });
	};

  function filter() {
    
    EventService.filter($scope.filter.event)
      .success(function (data) {
        $scope.events = data;
        $scope.$broadcast('scroll.refreshComplete');
      })
      .error(function (error) {
        alert('Ocorreu um erro ao recuperar os eventos');
      });
  };



  function solicitation(event){

     var confirmPopup = $ionicPopup.confirm({
       title: 'Solicitação',
       template: 'Enviar solicitação para partipar do evento?',
       cssClass: 'custom-alert',
       buttons: [{ // Array[Object] (optional). Buttons to place in the popup footer.
          text: 'Não',
          type: 'button-default',
          onTap: function(e) {
            // e.preventDefault() will stop the popup from closing when tapped.
            // e.preventDefault();
          }
        }, {
          text: 'Sim',
          type: 'button-positive',
          onTap: function(e) {
            // Returning a value will cause the promise to resolve with the given value.
            // return scope.data.response;
          }
        }]
     });

     
   
  }

  
  $scope.teste = function(){
    $ionicModal.fromTemplateUrl('templates/modal-filter-events.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalFilterEvents = modal;
      $scope.modalFilterEvents.show()
    });

    
  }

});
