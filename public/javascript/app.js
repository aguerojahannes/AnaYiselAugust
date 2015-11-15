(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial', 'ngFileUpload'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider, $httpProvider) {
		$stateProvider

//----------- HOME - DASHBOARD STATES --------------------
		.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		})
		.state('Dashboard',{
			url: '/dashboard',
			templateUrl: 'views/dashboard.html'
		})
//---------------- CONTACTS STATES ------------------------

		.state('Account',{
			url: '/account/:id',
			templateUrl: 'views/account.html'
		}).state('Contacts',{
			url: '/contacts',
			templateUrl: 'views/contacts.html'
		})
		.state('AddContact',{
			url: '/addcontact',
			templateUrl: 'views/addContact.html'
		})
		.state('EditContact',{
			url: '/editcontact',
			templateUrl: 'views/editContact.html'
		})
//---------------- CIRCLES STATES ------------------------
		.state('DisplayCircle',{
			url: '/displaycircle',
			templateUrl: 'views/displayCircle.html'
		})
		.state('CreateCircle',{
			url: '/createcircle',
			templateUrl: 'views/createCircle.html'
		})
		.state('AddContactCircle',{
			url: '/addcontactcircle',
			templateUrl: 'views/addContactCircle.html'
		})
		.state('EditCircle',{
			url: '/editcircle',
			templateUrl: 'views/editCircle.html'
		})
//---------------- REQUEST STATES ------------------------
		.state('Requests',{
			url: '/requests',
			templateUrl: 'views/requests.html'
		})
		.state('AddRequest',{
			url: '/addrequest',
			templateUrl: 'views/addRequest.html'
		})
		.state('EditRequest',{
			url: '/editrequest',
			templateUrl: 'views/editRequest.html'
		})
//---------------- USER PROFILE STATES ------------------------
		.state('Profile',{
			url: '/profile/:id',
			templateUrl: 'views/profile.html'
		})
		.state('ProfileEs',{
			url: '/perfil/:id',
			templateUrl: 'views/profileEs.html'
		})
		.state('EditProfile',{
			url: '/editProfile/:id',
			templateUrl: 'views/editProfile.html'
		})
//---------------- SIGN UP - SIGN IN STATES ------------------------
		.state('SignUpEs',{
			url: '/registrar',
			templateUrl: 'views/signupEs.html'
		})
		.state('SignUp',{
			url: '/signup',
			templateUrl: 'views/signup.html'
		})
		.state('SignIn',{
			url: '/signIn',
			templateUrl: 'views/signIn.html'
		})
		.state('SignInEs',{
			url: '/signInEs',
			templateUrl: 'views/signInEs.html'
		})
//---------------- RESET-FORGOT PASSWORD STATES ---------------
		.state('ForgotPassword',{
			url: '/forgotPassword',
			templateUrl: 'views/forgotPassword.html'
		})
		.state('ResetPassword',{
			url: '/resetPassword/:id',
			templateUrl: 'views/resetPassword.html'
		});
//----------------- OTHER ------------------------------------------------------
		$urlRouterProvider.otherwise('/');
		$httpProvider.interceptors.push("AuthInterceptor");
	}
})();
