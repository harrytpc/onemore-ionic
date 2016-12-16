angular.module('starter.interceptors')
.config(function($stateProvider, $urlRouterProvider, $locationProvider, jwtInterceptorProvider, $httpProvider, jwtOptionsProvider) {

  jwtOptionsProvider.config({
  	whiteListedDomains: ['ec2-52-42-47-0.us-west-2.compute.amazonaws.com', 'localhost', 'zs-samsungativ', '10.0.0.24']
  });	

	jwtInterceptorProvider.tokenGetter = function(jwtHelper, $http, $window, KeycloakService, $localStorage) {
	    
		if(!$localStorage.jwt){
      return null;
    }

    var access_token = $localStorage.jwt.access_token;
    if(!access_token){
      return null;
    }
   
    if (jwtHelper.isTokenExpired($localStorage.jwt.access_token)) {
    	return KeycloakService.refresh()
      .success(function (data) {
        return $localStorage.jwt.access_token;
      })
      .error(function (error) {
      	$localStorage.jwt = null;
				$localStorage.loggedUser = null;
        // alert('Refazer Login');
        $state.go('welcome'); 
      });

    } else {
      return $localStorage.jwt.access_token;
    }
  };

  $httpProvider.interceptors.push('jwtInterceptor');
  
  $httpProvider.interceptors.push(function($q) {
	    var realEncodeURI = window.encodeURI;
	    return {
	      'request': function(config) {	   
	      	 config.url = realEncodeURI(config.url)      
	         return config;
	      }
	    };
	  });
})

.config(function($httpProvider) {
	$httpProvider.defaults.headers.common["Accept"] = "application/json";
	$httpProvider.defaults.headers.common["Content-Type"] = "application/json;";
})

// .config(function ($httpProvider) {
// 	$httpProvider.interceptors.push('httpRequestInterceptor');
// })

// .factory('httpRequestInterceptor', ['API_KEY', function(API_KEY) {
//     return {
//         request: function($config) {
//             $config.headers['X-API-Key'] = API_KEY;
//             return $config;
//         }
//     };
// }])





.controller('LoginOrizonController', LoginOrizonController);	
	LoginOrizonController.$inject = [ '$http', '$location', '$scope', '$window', '$timeout', 'jwtHelper', 'URL_PROXY', 'URL_PORTAL_INSTITUCIONAL', 'EFETUAR_LOGIN'];
	function LoginOrizonController($http, $location, $scope, $window, $timeout, jwtHelper, URL_PROXY, URL_PORTAL_INSTITUCIONAL, EFETUAR_LOGIN) {
		var params = $location.absUrl().split("?");
		var token = params[1].replace("jwt=", "");
		$scope.tipoLogin = "P";

		efetuarLogin(token);

		function efetuarLogin(token){
			localStorage.setItem("tokenLoginFatureAtual", token);
			$http({
		       url: EFETUAR_LOGIN + "?login=" + token,
		       method: 'GET',
		       skipAuthorization: true
		   	}).then(
		   		function(response) {
 					// Store Data
 					if(response.data && response.data.token !== "Erro"){
 						var jwt = JSON.parse(response.data.token);
	        			localStorage.setItem("id_token", jwt.token.id_token);
	        			localStorage.setItem("access_token", jwt.token.access_token);
	        			localStorage.setItem("refresh_token", jwt.token.refresh_token);
						localStorage.setItem("idPrestador", JSON.parse(atob(jwt.ID)).idPrestador > 0 ? JSON.parse(atob(jwt.ID)).idPrestador : "0");
						localStorage.setItem("idOperadora", JSON.parse(atob(jwt.ID)).idComprador > 0 ? JSON.parse(atob(jwt.ID)).idComprador : "0");
						localStorage.setItem("nomePrestador", JSON.parse(atob(jwt.ID)).nomePrestador);
						localStorage.setItem("nomeUsuario", JSON.parse(atob(jwt.ID)).nomeUsuario);
						localStorage.setItem("nomeImpersonator", JSON.parse(atob(jwt.ID)).nomeImpersonator ? JSON.parse(atob(response.data.ID)).nomeImpersonator : null);
						localStorage.setItem("nomeUsuarioImpersonator", JSON.parse(atob(jwt.ID)).nomeUsuarioImpersonator ? JSON.parse(atob(jwt.ID)).nomeUsuarioImpersonator : null);
						localStorage.setItem("userData", jwt.ID);
						localStorage.setItem("tipoLogin", localStorage.idPrestador > 0 ? "P" : "O");
						localStorage.setItem("IS_SIMULACAO", false);
						localStorage.setItem("IS_ATENDENTE_SIMULACAO", false);
						
						return obterDadosAdicionais();
					}else{
						$scope.mensagemModal = "Acesso negado"
						$("#modalMensagens").modal('show');
						$("#modalMensagens").on('hidden.bs.modal', function(modal){
							$timeout(function () {
								$("#modalMensagens").unbind('hidden.bs.modal');
								$window.location.href = URL_PORTAL_INSTITUCIONAL;				       			
					       }, 150, true);
		       			});
		       			return;
					}
			   	},
			   	function(response){
					$scope.mensagemModal = "Acesso negado"
					$("#modalMensagens").modal('show');
					$("#modalMensagens").on('hidden.bs.modal', function(modal){
						$timeout(function () {
							$("#modalMensagens").unbind('hidden.bs.modal');
							$window.location.href = URL_PORTAL_INSTITUCIONAL;				       			
					    }, 150, true);
		       		});
		       		return;
				}
			);
		}

		function obterDadosAdicionais(){
			$http({
				    url: URL_PROXY + "RetornaDadosPrestador",
				    method: 'GET'
				}).then(function(response){
					var url = response.data;
					$http({
					    url: url + "?DsLogin=" + localStorage.getItem("nomeUsuario"),
					    method: 'GET'
					}).then(
						function(response){
									localStorage.setItem("grupoAcesso", response.data.GrupoAcesso);
									localStorage.setItem("tipoPrestador", response.data.TipoPrestador);
									localStorage.setItem("id", response.data.Id);
									localStorage.setItem("flex", response.data.Flex ? response.data.Flex : false);
									localStorage.setItem("loginId", response.data.Login_Id);
									$window.location.href = localStorage.tipoLogin == "P" ? "prestador.html#/dashboard" : "operadora.html#/dashboard";
						},
						function(response){
							$window.location.href = URL_PORTAL_INSTITUCIONAL;	
						}
					);
				});

		}
	}
;
