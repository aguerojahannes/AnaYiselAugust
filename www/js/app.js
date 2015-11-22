

    // Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.services', 'ui.router', 'ngMaterial', 'ngFileUpload'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

//----------- LANGUAGE &HOME STATES --------------------
    .state('Language',{
      url: '/',
      templateUrl: 'templates/language.html'
    })
        .state('Home',{
      url: '/',
      templateUrl: 'templates/home.html'
    })
        .state('HomeEs',{
      url: '/',
      templateUrl: 'templates/homeEs.html'
    })
//---------------- SIGN UP STATES ------------------------
    .state('SignUpEs',{
      url: '/registrar',
      templateUrl: 'templates/signupEs.html'
    })
    .state('SignUp',{
      url: '/signup',
      templateUrl: 'templates/signup.html'
    })
    .state('NewProfile',{
      url: '/newProfile',
      templateUrl: 'templates/newProfile.html'
    })
    .state('NewProfileEs',{
      url: '/nuevoPerfil',
      templateUrl: 'templates/newProfileEs.html'
    })
//---------------- SIGN IN STATES ------------------------
    .state('SignIn',{
      url: '/signIn',
      templateUrl: 'templates/signIn.html'
    })
    .state('SignInEs',{
      url: '/signInEs',
      templateUrl: 'templates/signInEs.html'
    })
//---------------- RESET-FORGOT PASSWORD STATES ---------------
    .state('ForgotPassword',{
      url: '/forgotPassword',
      templateUrl: 'templates/forgotPassword.html'
    })
    .state('ForgotPasswordEs',{
      url: '/forgotPasswordEs',
      templateUrl: 'templates/forgotPasswordEs.html'
    })
    .state('ResetPassword',{
      url: '/resetPassword/:id',
      templateUrl: 'templates/resetPassword.html'
    })
    .state('ResetPasswordEs',{
      url: '/resetPasswordEs/:id',
      templateUrl: 'templates/resetPasswordEs.html'
    })



  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.circles', {
      url: '/circles',
      views: {
        'tab-circles': {
          templateUrl: 'templates/tab-circles.html',
          controller: 'ContactsCtrl'
        }
      }
    })
      .state('tab.contacts', {
      url: '/contacts',
      views: {
        'tab-contacts': {
          templateUrl: 'templates/tab-contacts.html',
          controller: 'ContactsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.requests', {
    url: '/requests',
    views: {
      'tab-requests': {
        templateUrl: 'templates/tab-requests.html',
        controller: 'RequestsCtrl'
      }
    }
  })

  .state('profile',{
      url: '/profile/:id',
      templateUrl: 'templates/profile.html'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
