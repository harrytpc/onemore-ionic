angular.module('starter.services', []);
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, KeycloakService, $state, $localStorage) {

  // Form data for the login modal
  $scope.loginData = {};

  $scope.logout = function(){
    // $rootScope.user = {};
    $state.go('welcome');
    KeycloakService.logoff();
  };  

  $scope.loggedUser = $localStorage.loggedUser.firstName + ' ' + $localStorage.loggedUser.lastName;
  



  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);

  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };
})

