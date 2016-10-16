angular.module('starter.controllers')

.controller('TokenCtrl', function($scope, $ionicModal, $timeout, $rootScope, 
  $state, $ionicPopup, $location, KeycloakService, $q, StorageService, jwtHelper, $ionicSideMenuDelegate, $localStorage) {

  $ionicSideMenuDelegate.canDragContent(false);


  $scope.login = function() {
 
    KeycloakService.login()
      .success(function (data) {
        
      })
      .error(function (error) {
          alert('Erro ao fazer login');
      });
  };

  $scope.refresh = function() {
    
    KeycloakService.refresh()
      .success(function (data) {
        
      })
      .error(function (error) {
          alert('Erro ao fazer login');
      });
  };

  $scope.logoff = function() {
    
    KeycloakService.logoff()
      .success(function (data) {
        
      })
      .error(function (error) {
          alert('Erro ao fazer logoff');
      });
  };
  
  $scope.userInfo = function() {
    
    KeycloakService.userInfo()
      .success(function (data) {
        
      })
      .error(function (error) {
          alert('Erro ao fazer logoff');
      });
  };

 
 
});
