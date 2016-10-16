angular.module('starter.controllers')

.controller('LoginCtrl', function($scope, $ionicModal, $timeout, $rootScope, 
  $state, $ionicPopup, $location, KeycloakService, $q, StorageService, jwtHelper, $ionicSideMenuDelegate) {

  $ionicSideMenuDelegate.canDragContent(false);


  $scope.loginSSO = function() {
    var deferred = $q.defer();
    var ref = window.open($rootScope.baseUrlSSO + "/protocol/openid-connect/auth?client_id=" + "onemoreapp" + "&redirect_uri=http://localhost/callback&response_type=code", "_blank", "location=no,clearsessioncache=yes,clearcache=yes,toolbar=yes");
    
    
    ref.addEventListener('loadstart', function(event) {
      if ((event.url).startsWith("http://localhost/callback")) {
        requestToken = (event.url).split("code=")[1];
        ref.close();

        KeycloakService.token(requestToken)
          .success(function (data) {
            KeycloakService.userInfo()
              .success(function (data) {
                $state.go('app.contacts');    
              });
          })
          .error(function (error) {
              console.log('Erro ao recuperar token');
          });
      }
    });
    ref.addEventListener('exit', function(event) {
        deferred.reject("The sign in flow was canceled");
    });
  };
 
  if (typeof String.prototype.startsWith != 'function') {
      String.prototype.startsWith = function (str){
          return this.indexOf(str) == 0;
      };
  }

  $scope.loginForcado = function() {
    KeycloakService.login()
      .success(function (data) {
        KeycloakService.userInfo()
          .success(function (data) {
            $state.go('app.contacts');    
          });
      })
      .error(function (error) {
          alert('Erro ao fazer login');
      });
  };

  $scope.goContacts = function(){
    $location.path('/contacts');
  }
});
