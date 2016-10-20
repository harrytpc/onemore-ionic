angular.module('starter.controllers')

.controller('ContactsCtrl', function($scope, $ionicModal, $timeout, $rootScope, RelationshipService) {

	$scope.findFollowing = findFollowing;
	// $scope.findUsers = findUsers;
    $scope.unfollow = unfollow;

 	findFollowing();

	function findFollowing() {
		RelationshipService.find(true)
			.success(function (data) {
            $scope.followings = data;
        })
        .error(function (error) {
            $scope.status = 'Erro ao pesquisar usuarios';
            console.log($scope.status);
        });
	};

	// function findUsers() {
	// 	RelationshipService.find(false)
	// 		.success(function (data) {
 //            $scope.users = data;
 //        })
 //        .error(function (error) {
 //            $scope.status = 'Erro ao pesquisar usuarios';
 //            console.log($scope.status);
 //        });
	// };

    function follow(userId) {
        RelationshipService.follow(userId)
            .success(function (data) {
            // $scope.users = data;
        })
        .error(function (error) {
            $scope.status = 'Erro ao seguir usuario';
            console.log($scope.status);
        });
    };

    function unfollow(userId) {

        var i = 0;
        var pos = 0;
        $scope.followings.forEach(function(obj) {
          if(obj.followed.id == userId){
            pos = i;
          }
          i++;
        });

        $scope.followings.splice(pos, 1);

        RelationshipService.unfollow(userId)
            .success(function (data) {
            // $scope.users = data;
        })
        .error(function (error) {
            $scope.status = 'Erro ao deixar de seguir usuario';
            console.log($scope.status);
        });
    };
 

});
