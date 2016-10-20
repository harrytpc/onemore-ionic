angular.module('starter.controllers')

.controller('SearchContactsCtrl', function($http, $scope, $ionicModal, $timeout, $rootScope, $stateParams, UserService, RelationshipService) {

	$scope.findUser=findUser;
  $scope.follow=follow;

 	findUser();

	function findUser() {
		UserService.findUserNotFollowing()
			.success(function (data) {
            $scope.contacts = data;
        })
        .error(function (error) {
            $scope.status = 'Erro ao pesquisar usuarios';
            console.log($scope.status);
        });
	};
 

  function follow(userId) {
    var i = 0;
    var pos = 0;
    $scope.contacts.forEach(function(obj) {
      if(obj.id == userId){
        pos = i;
      }
      i++;
    });

    $scope.contacts.splice(pos, 1);

    RelationshipService.follow(userId)
      .success(function (data) {
            // $scope.users = data;
      })
      .error(function (error) {
        $scope.status = 'Erro ao seguir usuario';
        console.log($scope.status);
      });
    };

})

.filter('searchContacts', function(){
  return function (items, query) {
    var filtered = [];
    var letterMatch = new RegExp(query, 'i');
    if(!items){
      return;
    }

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (query) {
        if (letterMatch.test(item.firstName.substring(0, query.length))) {
          filtered.push(item);
        }
      } else {
        filtered.push(item);
      }
    }
    return filtered;
  };
});
