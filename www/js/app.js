// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter.services', []);
angular.module('starter.directives', []);
angular.module('starter.interceptors', ['ngStorage', 'angular-jwt']);
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives', 'starter.interceptors', 'angular-jwt', 'ngStorage'])

.run(function($ionicPlatform, $rootScope) {

   $rootScope.baseUrlBackend = 'http://ec2-52-42-47-0.us-west-2.compute.amazonaws.com:8080/apiman-gateway/onemore/services/1.0';
   $rootScope.baseUrlSSO = 'http://ec2-52-42-47-0.us-west-2.compute.amazonaws.com:8080/auth/realms/onemore';
  
  // $rootScope.baseUrlBackend = 'http://localhost:8080/apiman-gateway/onemore/services/1.0';
  // $rootScope.baseUrlSSO = 'http://localhost:8080/auth/realms/socc3r';
  
  // $rootScope.baseUrlBackend = 'http://10.0.0.24:8080/apiman-gateway/onemore/services/1.0';
  // $rootScope.baseUrlSSO = 'http://10.0.0.24:8080/auth/realms/socc3r';

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
  
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.contacts', {
    url: '/contacts',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/contacts.html',
        controller: 'ContactsCtrl'
      }
    }
  })

  .state('app.searchContacts', {
    url: '/searchContacts',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/searchContacts.html',
        controller: 'SearchContactsCtrl'
      }
    }
  })

  .state('app.events', {
    url: '/events/:menuName',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/events.html',
        controller: 'EventsCtrl'
      }
    }
  })

  .state('app.viewEvent', {
    url: '/view-event/:eventId',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/viewEvent.html',
        controller: 'ViewEventCtrl'
      }
    }
  })

  .state('app.editEvent', {
    url: '/edit-event/:eventId',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/editEvent.html',
        controller: 'EditEventCtrl'
      }
    }
  })

  // .state('app.newEvent', {
  //   url: '/new-event',
  //   cache: false,
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/newEvent.html',
  //       controller: 'NewEventCtrl'
  //     }
  //   }
  // })


  .state('app.eventsAdmin', {
    url: '/events-admin/:menuName',
    views: {
      'menuContent': {
        templateUrl: 'templates/events.html',
        controller: 'EventsCtrl'
      }
    }
  })

  .state('app.confirmedEvents', {
    url: '/confirmed-events/:menuName',
    views: {
      'menuContent': {
        templateUrl: 'templates/events.html',
        controller: 'EventsCtrl'
      }
    }
  })

  .state('app.pendingInvites', {
    url: '/pending-invites/:menuName',
    views: {
      'menuContent': {
        templateUrl: 'templates/events.html',
        controller: 'EventsCtrl'
      }
    }
  })
  
//HARRY
  .state('welcome', {
    url: '/welcome',
    templateUrl: 'templates/welcome.html',
    controller: 'LoginCtrl'
  })

  .state('token', {
    url: '/token',
    templateUrl: 'templates/token.html',
    controller: 'TokenCtrl'
  })

;
  // $locationProvider.html5Mode(true);
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/welcome');
});

