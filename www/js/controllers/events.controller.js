angular.module('starter.controllers')

.controller('EventsCtrl', function($scope, $ionicModal, $timeout, $rootScope, $http, 
  EventService, $ionicPopup, ModalityService, StateService, RelationshipService ) {


  $scope.solicitation = solicitation;
  $scope.filterEvents = filterEvents;
  $scope.clearFilter = clearFilter;

 	
  init();

  function init(){
    $scope.filter = {} 
    $scope.filter.event = {};
    filterEvents();
    findModalitiesFilter() ;

  }

  function findModalitiesFilter(){
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
    filterEvents();
  }


  function filterEvents() {
    
    EventService.filter($scope.filter.event)
      .success(function (data) {
        $scope.events = data;
        $scope.$broadcast('scroll.refreshComplete');
      })
      .error(function (error) {
        // alert('Ocorreu um erro ao recuperar os eventos');
        console.log('Ocorreu um erro ao recuperar os eventos');
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


  
  $scope.modalFilter = function(){
    $ionicModal.fromTemplateUrl('templates/modal-filter-events.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalFilterEvents = modal;
      $scope.modalFilterEvents.show()
    });

    
  }

  $scope.newEvent = function(){
    $ionicModal.fromTemplateUrl('templates/editEvent.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalEditEvent = modal;
      $scope.modalEditEvent.show();
      // $scope.newEvent.
      initNewEvent();
    });
  }


  $scope.editEvent = function(event){
    $scope.event = {};



    $ionicModal.fromTemplateUrl('templates/editEvent.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalEditEvent = modal;
      $scope.modalEditEvent.show();
      // $scope.newEvent.
      initEditEvent(event);
    });
  }

  $scope.viewEvent = function(event){
    $ionicModal.fromTemplateUrl('templates/viewEvent.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalViewEvent = modal;
      $scope.modalViewEvent.show();
      // $scope.newEvent.
      initViewEvent(event);
    });
  }

  function initEditEvent(event){
    EventService.getById(event.id)
      .success(function (data) {
          $scope.event = data;
          $scope.event.nameTemp = $scope.event.name;
          getInvitations($scope.event.id);

        })
        .error(function (error) {
          $scope.status = 'Erro ao recuperar o evento';
          console.log($scope.status);
        });
    ModalityService.findModality()
      .success(function (data) {
        $scope.editEvent.modalities = data;
      });

    StateService.findStates()
      .success(function (data) {
        $scope.editEvent.states = data;
      });    
  }

  function initViewEvent(event){
    EventService.getById(event.id)
      .success(function (data) {
          $scope.event = data;
        })
        .error(function (error) {
          $scope.status = 'Erro ao recuperar o evento';
          console.log($scope.status);
        });
  }



  function initNewEvent(){
    $scope.event = {};
    $scope.editEvent = {};
    ModalityService.findModality()
      .success(function (data) {
        $scope.editEvent.modalities = data;
      });

    StateService.findStates()
      .success(function (data) {
        $scope.editEvent.states = data;
      });
  }

  $scope.onSelectStateEditEvent = function(){
    
    if(!$scope.editEvent.state){
      $scope.editEvent.cities = [];
    }

    StateService.findCitiesByStateId($scope.event.state.id)
      .success(function (data) {
                $scope.editEvent.cities = data;
            })
            .error(function (error) {
                $scope.status = 'Erro ao pesquisar cidades';
                console.log($scope.status);
                // alert($scope.status);
            }); 
  }

  $scope.saveEvent = function(){

    if(!$scope.event.name){

      $scope.itemList=[];
      $scope.itemList.push('Campo1');
      
      $ionicModal.fromTemplateUrl('templates/modal.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modalAlert = modal;
          $scope.modalAlert.show()
        });


    }else{
      
      EventService.insert($scope.event)
        .success(function (data) {
          $scope.event = data;

          var alertPopup = $ionicPopup.alert({
             title: 'Sucesso!',
             template: 'O evento foi criado com sucesso! Agora você já pode convidar seus amigos para participar.',
             cssClass: 'custom-alert',

           });

           alertPopup.then(function(res) {
             
           });

        })
        .error(function (error) {
          $scope.status = 'Erro ao inserir evento';
          console.log($scope.status);
          // alert($scope.status);
        });     
    }
    
    
  }

  $scope.selectContactsInvite = function(){

    RelationshipService.find(true)
      .success(function (data) {
            $scope.relationshipList = data;
        });
    
    $ionicModal.fromTemplateUrl('templates/contacts-modal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modalContacts = modal;
        $scope.modalContacts.show()
      });

  }

  $scope.finishSelectContactsInvite = function(){
    $scope.modalContacts.hide();
    $scope.selectedUsers = [];
    $scope.relationshipList.forEach(function(relationship) {
      if(relationship.checked){
        $scope.selectedUsers.push(relationship.followed);
      }
    });
    EventService.invite($scope.event.id, $scope.selectedUsers)
      .success(function (data) {
        // getInvitations();
        console.log(data)
      })
      .error(function (error) {
        $scope.status = 'Erro ao enviar convites';
        console.log($scope.status);
      });
    
  }

  function getInvitations(eventId){
    EventService.getInvitations(eventId)
      .success(function (data) {
        $scope.invitations = data;
      })
      .error(function (error) {
        alert('Ocorreu um erro ao recuperar os eventos');
      });
  }





});
