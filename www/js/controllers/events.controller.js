angular.module('starter.controllers')

.controller('EventsCtrl', function($scope, $ionicModal, $timeout, $rootScope, $http, 
  EventService, $ionicPopup, ModalityService, StateService, RelationshipService, InvitationService, $ionicPopover, $stateParams, $ionicLoading ) {

  $scope.menuName = $stateParams.menuName; //getting fooVal
  
  var loadingConfig = {
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    };

  if($scope.menuName == 'eventsAdminMenu'){
    $scope.eventsTitle = 'Administrar Eventos';
  } else if($scope.menuName == 'confirmedMenu'){
    $scope.eventsTitle = 'Eventos confirmados';
  } else if($scope.menuName == 'pendingMenu'){
    $scope.eventsTitle = 'Convites pendentes';
  }else if($scope.menuName == 'eventsMenu'){
    $scope.eventsTitle = 'Eventos';
  }
  
  
  // $scope.solicitation = solicitation;
  $scope.filterEvents = filterEvents;
  $scope.clearFilter = clearFilter;
  
  init();

  function init(){
    $scope.filter = {} 
    $scope.filter.event = {};
    filterEvents();
    
    loadFilterSelects();
  }

  function loadFilterSelects(){
    findModalitiesFilter() ;
    findStatesFilter();
  }

  function findStatesFilter(){
    StateService.findStates()
      .success(function (data) {
        $scope.filter.states = data;
      });    
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

  $scope.onSelectStateFilterEvent = function(){
    if(!$scope.filter.event.state){
      $scope.filter.cities = [];
    }

    StateService.findCitiesByStateId($scope.filter.event.state.id)
      .success(function (data) {
          $scope.filter.cities = data;
      })
      .error(function (error) {
          $scope.status = 'Erro ao pesquisar cidades';
          console.log($scope.status);
          // alert($scope.status);
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


  $scope.requestEvent = function (event){

    $ionicLoading.show(loadingConfig);
    
    EventService.request(event.id)
      .success(function (data) {
        $ionicLoading.hide();
        event.requested = true;
        event.invitation = data;
        console.log(data)
      })
      .error(function (error) {
        $ionicLoading.hide();
        event.requested = false;
        $scope.status = 'Erro ao enviar convites';
        console.log($scope.status);
      });
  }

  $scope.cancelInvitation = function(event){
    $ionicLoading.show(loadingConfig);
    
    InvitationService.cancelInvitation(event.invitation.id)
      .success(function (data) {
        $ionicLoading.hide();
        event.requested = false;
        event.invitation = {};
        // console.log(data)
      })
      .error(function (error) {
        $ionicLoading.hide();
        // event.requested = tr;
        $scope.status = 'Erro ao enviar convites';
        console.log($scope.status);
      }); 
  }

  $scope.cancelConfirmation = function(event){
    $ionicLoading.show(loadingConfig);
    
    InvitationService.cancelInvitation(event.invitation.id)
      .success(function (data) {
        $ionicLoading.hide();
        event.confirmed = false;
        event.invitation = {};
        event.invitationsSummary.confirmed = event.invitationsSummary.confirmed - 1;
        // console.log(data)
      })
      .error(function (error) {
        $ionicLoading.hide();
        // event.requested = tr;
        $scope.status = 'Erro ao enviar convites';
        console.log($scope.status);
      });  
  }


  $scope.answerInvited = function(event, answer){
    $ionicLoading.show(loadingConfig);

    InvitationService.answerInvitation(event.invitation.id, answer)
      .success(function (data) {
        $ionicLoading.hide();
        event.invited = false;
        if(answer == true){
          event.confirmed = true;  
          event.invitationsSummary.confirmed = event.invitationsSummary.confirmed + 1;
        }
        event.invitation = data;
        // console.log(data)
      })
      .error(function (error) {
        $ionicLoading.hide();
        // event.requested = tr;
        $scope.status = 'Erro ao enviar convites';
        console.log($scope.status);
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

  $scope.openModalConfirmeds = function(event){
    $scope.confirmedsList = [];

    $ionicLoading.show(loadingConfig);

    InvitationService.getConfirmeds(event.id)
      .success(function (data) {
        $ionicLoading.hide();
        $scope.confirmedsList = data;
        
        console.log(data)
      })
      .error(function (error) {
        $ionicLoading.hide();
        // event.requested = tr;
        $scope.status = 'Erro ao buscar confirmados';
        console.log($scope.status);
      }); 

    $ionicModal.fromTemplateUrl('templates/modal-confirmeds.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalConfirmeds = modal;
      $scope.modalConfirmeds.show()
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


  $scope.editEvento = function(){
    $scope.event = {}; 
    $scope.editEvent = {};
    $ionicModal.fromTemplateUrl('templates/editEvent.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modalEditEvent = modal;
      $scope.modalEditEvent.show();
      // $scope.newEvent.
      initEditEvent($scope.eventTemp);
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
          $scope.event.date = new Date($scope.event.date);
          $scope.event.time = $scope.event.date;
          $scope.event.nameTemp = $scope.event.name;
          $scope.event.state = $scope.event.city.state
          // $scope.event.modality.id = '4';
          // getInvitations($scope.event.id);

          StateService.findStates()
          .success(function (data) {
            $scope.editEvent.states = data;
            $scope.onSelectStateEditEvent();
          });    

        })
        .error(function (error) {
          $scope.status = 'Erro ao recuperar o evento';
          console.log($scope.status);
        });
    
    ModalityService.findModality()
      .success(function (data) {
        $scope.editEvent.modalities = data;

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

  function validSave(event){
    var camposObrigatorios=[];

    if(!$scope.event.name){
      camposObrigatorios.push('Nome');
    }
    if(!$scope.event.date){
      camposObrigatorios.push('Data');
    }
    if(!$scope.event.time){
      camposObrigatorios.push('Horário');
    }
    if(!$scope.event.modality || !$scope.event.modality.id){
      camposObrigatorios.push('Modalidade');
    }
    if(!$scope.event.state || !$scope.event.state.id){
      camposObrigatorios.push('Estado');
    }
    if(!$scope.event.city || !$scope.event.city.id){
      camposObrigatorios.push('Cidade');
    }
    if(!$scope.event.local){
      camposObrigatorios.push('Endereço');
    }

    return camposObrigatorios;
  }

  $scope.saveEvent = function(){
    camposObrigatorios = validSave();

    if(camposObrigatorios.length){

      $scope.camposObrigatorios = camposObrigatorios;
      // $scope.camposObrigatorios.push('Campo1');
      
      $ionicModal.fromTemplateUrl('templates/modalCamposObrigatorios.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modalCamposObrigatorios = modal;
          $scope.modalCamposObrigatorios.show();
        });


    }else{
      
      // $scope.event.date = $scope.event.dateStr;

      $scope.event.date.setHours($scope.event.time.getHours());
      $scope.event.date.setMinutes($scope.event.time.getMinutes());

      if(!$scope.event.id){
        EventService.insert($scope.event)
        .success(function (data) {
          $scope.event = data;

          var alertPopup = $ionicPopup.alert({
             title: 'Sucesso!',
             template: 'O evento foi criado com sucesso! Agora você já pode convidar seus amigos para participar.',
             cssClass: 'custom-alert',
           });

           alertPopup.then(function(res) {
             $scope.modalEditEvent.hide();
             init();
           });

        })
        .error(function (error) {
          $scope.status = 'Erro ao inserir evento';
          console.log($scope.status);
          // alert($scope.status);
        });       
      }else{
        

        EventService.update($scope.event)
        .success(function (data) {
          // $scope.event = data;

          var alertPopup = $ionicPopup.alert({
             title: 'Sucesso!',
             template: 'O evento foi atualizado com sucesso!',
             cssClass: 'custom-alert',
           });

           alertPopup.then(function(res) {
             $scope.modalEditEvent.hide();
             init();
           });

        })
        .error(function (error) {
          $scope.status = 'Erro ao atualizar evento';
          console.log($scope.status);
          // alert($scope.status);
        });       

      }

      
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
        $scope.event.invitationsSummary.pendingInvites = $scope.event.invitationsSummary.pendingInvites + $scope.selectedUsers.length;
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

  var monthNames = [
    "Janeiro", "Fevereiro", "Março",
    "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro",
    "Novembro", "Dezembro"
  ];

  $scope.timestampToDateStr = function(dateTimestamp){
    var date = new Date(dateTimestamp);

    return (pad(date.getDate()) + ' de ' + monthNames[date.getMonth()] + ' de ' + date.getFullYear() 
      + ' às ' + pad(date.getHours()) + ':' + pad(date.getMinutes()));

  }

  $scope.timestampToDate = function(dateTimestamp){
    var date = new Date(dateTimestamp);

    return (pad(date.getDate()) + '/' + pad(date.getMonth()+1) + '/' + date.getFullYear() 
      + ' às ' + pad(date.getHours()) + ':' + pad(date.getMinutes()));

  }

  function pad(n) {
    return (n < 10) ? ("0" + n) : n;
  }

  $ionicPopover.fromTemplateUrl('templates/popoverAdmin.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popoverAdmin = popover;
  });

  $scope.showPopoverAdmin = function($event, event){
    $scope.eventTemp = event; 
    $scope.popoverAdmin.show($event);
  }
  

  $scope.deleteEvent = function(){

   
     var confirmDeletePopup = $ionicPopup.confirm({
       title: 'Exclusão',
       template: 'Você realmente deseja excluir o evento?',
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
          type: 'button-assertive', 
          onTap: function(e) {
            // Returning a value will cause the promise to resolve with the given value.
            // return scope.data.response;
            // event.solicitationSent = true;
          }
        }]
     });

  }

  $scope.openModalSolicPartEdit = function(event){

    $scope.SolicsList = [];
    $ionicLoading.show(loadingConfig);
    InvitationService.getPendingApproval(event.id)
      .success(function (data) {
        $ionicLoading.hide();
        $scope.SolicsList = data;
        // console.log(data)
      })
      .error(function (error) {
        $ionicLoading.hide();
      }); 
    
    $ionicModal.fromTemplateUrl('templates/modal-solic-part-edit.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modalSolicPartEdit = modal;
        $scope.modalSolicPartEdit.show()
      });

  }
  
  $scope.openModalConfirmedsEdit = function(event){
    
    $scope.confirmedsList = [];
    $ionicLoading.show(loadingConfig);
    InvitationService.getConfirmeds(event.id)
      .success(function (data) {
        $ionicLoading.hide();
        $scope.confirmedsList = data;
        // console.log(data)
      })
      .error(function (error) {
        $ionicLoading.hide();
      }); 

    $ionicModal.fromTemplateUrl('templates/modal-confirmeds-edit.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modalConfirmedsEdit = modal;
        $scope.modalConfirmedsEdit.show()
      });


  }


  $scope.openModalPendingEdit = function(event){
    $scope.invitedsList = [];
    $ionicLoading.show(loadingConfig);
    InvitationService.getInviteds(event.id)
      .success(function (data) {
        $ionicLoading.hide();
        $scope.invitedsList = data;
        // console.log(data)
      })
      .error(function (error) {
        $ionicLoading.hide();
      }); 
    $ionicModal.fromTemplateUrl('templates/modal-pending-edit.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modalPendingEdit = modal;
        $scope.modalPendingEdit.show()
      });

  }

  $scope.openModalDeclinedEdit = function(event){
    $scope.declinedsList = [];
    $ionicLoading.show(loadingConfig);
    InvitationService.getDeclined(event.id)
      .success(function (data) {
        $ionicLoading.hide();
        $scope.declinedsList = data;
        // console.log(data)
      })
      .error(function (error) {
        $ionicLoading.hide();
      }); 
    $ionicModal.fromTemplateUrl('templates/modal-declined-edit.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modalDeclinedEdit = modal;
        $scope.modalDeclinedEdit.show()
      });

  }

  $scope.answerSolic = function(invitationId, answer){
    $ionicLoading.show(loadingConfig);

    InvitationService.answerInvitation(invitationId, answer)
      .success(function (data) {
        $ionicLoading.hide();
        // event.invited = false;
        // if(answer == true){
        //   event.confirmed = true;  
        //   event.invitationsSummary.confirmed = event.invitationsSummary.confirmed + 1;
        // }
        // event.invitation = data;
        // console.log(data)
      })
      .error(function (error) {
        $ionicLoading.hide();
        // event.requested = tr;
        $scope.status = 'Erro ao enviar convites';
        console.log($scope.status);
      }); 
  }  

});
