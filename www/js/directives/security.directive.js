angular.module('starter.directives')

.controller('SecurityDirectiveController', SecurityDirectiveController)

.directive('securityDirective', function () {
  return {
    restrict: 'E',
    replace: true,
    controller: SecurityDirectiveController,
    link: function(scope, elem, attrs){
        
    }
}});            

SecurityDirectiveController.$inject = ['$scope', '$window', '$location', '$localStorage', 'jwtHelper', '$state'];
function SecurityDirectiveController($scope, $window, $location, $localStorage, jwtHelper, $state) {
  $scope.authenticated = false;
  isAuthenticated();

  function isAuthenticated(){

    if(!$localStorage.jwt){
      $scope.authenticated = false;
      redirectLogin();
      return;
    }

    var idToken = $localStorage.jwt.id_token;
    if(!idToken){
      $scope.authenticated = false;
      redirectLogin();
      return;
    }

    if (jwtHelper.isTokenExpired(idToken)) {
      // BaseDirectiveService.isAuthenticated().then(
      //   function(resource) {
            // $scope.authenticated = true;
        // },
        // function (error){
            $scope.authenticated = false;
            redirectLogin();
        // });                
      } else {
        $scope.authenticated = true;
      }
  }

  function redirectLogin(){
      $state.go('welcome'); 
      // $location.path("/welcome");   
  }
};        