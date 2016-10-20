angular.module('starter.controllers')

.controller('EditEventCtrl', function($scope, $ionicModal, $timeout, $rootScope, ModalityService, 
	CountryService, StateService, CityService, EventService, RelationshipService, $stateParams) {

	
	init();
	
	// $scope.event.date = new Date();
	$scope.onSelectState = onSelectState;
	$scope.onSelectCity = onSelectCity;
	$scope.selectContacts = selectContacts;
	$scope.finishSelectContacts = finishSelectContacts;
	$scope.save = save;

	// $scope.event.usersInvitations = [];
	
	function init(){
		$scope.eventId = $stateParams.eventId;
		if(!$scope.eventId){ // novo
			$scope.event = {};
		
		} else { // edicao
			EventService.getById($scope.eventId)
			.success(function (data) {
	        $scope.event = data;
	      })
	      .error(function (error) {
	        $scope.status = 'Erro ao recuperar o evento';
	        console.log($scope.status);
	      });
		}

		ModalityService.findModality()
			.success(function (data) {
        $scope.modalities = data;
      })
      .error(function (error) {
        $scope.status = 'Erro ao pesquisar modalidades';
        console.log($scope.status);
      });

    StateService.findStates()
			.success(function (data) {
        $scope.states = data;
      })
      .error(function (error) {
        $scope.status = 'Erro ao pesquisar estados';
        console.log($scope.status);
      }); 
	}

	

	function onSelectState(){
		
		if(!$scope.event.state){
			$scope.cities = [];
		}

		StateService.findCitiesByStateId($scope.event.state.id)
			.success(function (data) {
                $scope.cities = data;
            })
            .error(function (error) {
                $scope.status = 'Erro ao pesquisar cidades';
                console.log($scope.status);
                // alert($scope.status);
            }); 
	}

	function onSelectCity(){

	}

	function save(){

		if(!$scope.event.name){

			// $ionicModal.fromTemplateUrl('modalAlert.html', {
	  //     scope: $scope,
	  //     animation: 'slide-in-up',
	  //     focusFirstInput: true
	  //   	}).then(function(modal) {
	  //     	$scope.modal = modal;
	  //     	$scope.modal.show();			
	  //   	});

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
        })
        .error(function (error) {
          $scope.status = 'Erro ao inserir evento';
          console.log($scope.status);
          // alert($scope.status);
        }); 		
		}
		
		
		
	}

	function selectContacts(){

    	// $scope.contactsList=[{'name':'teste'}, {'name':'teste'}, {'name':'teste'}];

    	RelationshipService.find(true)
			.success(function (data) {
            $scope.relationshipList = data;
        })
        .error(function (error) {
            $scope.status = 'Erro ao pesquisar usuarios';
            console.log($scope.status);
        });
    
		$ionicModal.fromTemplateUrl('templates/contacts-modal.html', {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.modalContacts = modal;
		    $scope.modalContacts.show()
		  });

	}

	function finishSelectContacts(){
		$scope.modalContacts.hide();
		$scope.relationshipList.forEach(function(relationship) {
			if(relationship.checked){
				$scope.event.usersInvitations.push(relationship.followed);
				// console.log(contact);	
			}
	    
	});
		// $scope.event.contacts = $scope.contactsList
		// angular.forEach($scope.contactsList, function(value, key) {
		//   this.push(key + ': ' + value);
		// }, log);
	}


});

