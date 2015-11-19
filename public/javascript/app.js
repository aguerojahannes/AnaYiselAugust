(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial', 'ngFileUpload'])
	.config(Config);
	// .run(run);  // TESTING LANGUAGE SELECTION

	function Config($stateProvider, $urlRouterProvider, $httpProvider) {
		$stateProvider

	// function run(){  // TESTING LANGUAGE SELECTION
	// 	$rootscope.lang = 'EN';
	// }

//----------- HOME - DASHBOARD STATES --------------------
		.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		})
		.state('OverviewEs',{
			url: '/overviewEs',
			templateUrl: '/views/overviewEs.html'
		})
		.state('Overview',{
			url: '/overview',
			templateUrl: $rootscope + 'views/overview.html'
		})
//---------------- CONTACTS STATES ------------------------
		.state('Contacts',{
			url: '/contacts',
			templateUrl: $rootscope + 'views/contacts.html'
		})
		.state('ContactsEs',{
			url: '/contactsEs',
			templateUrl: 'views/contactsEs.html'
		})
		.state('AddContact',{
			url: '/addcontact',
			templateUrl: $rootscope + 'views/addContact.html'
		})
		.state('AddContactEs',{
			url: '/addcontactEs',
			templateUrl: 'views/addContactEs.html'
		})
		.state('EditContact',{
			url: '/editcontact',
			templateUrl: $rootscope + 'views/editContact.html'
		})
		.state('EditContactEs',{
			url: '/editcontactEs',
			templateUrl: 'views/editContactEs.html'
		})
//---------------- CIRCLES STATES ------------------------
		.state('DisplayCircle',{
			url: '/displaycircle',
			templateUrl: $rootscope + 'views/displayCircle.html'
		})
		.state('DisplayCircleEs',{
			url: '/displaycircleEs',
			templateUrl: 'views/displayCircleEs.html'
		})
		.state('CreateCircle',{
			url: '/createcircle',
			templateUrl: $rootscope + 'views/createCircle.html'
		})
		.state('CreateCircleEs',{
			url: '/createcircleEs',
			templateUrl: 'views/createCircleEs.html'
		})
		.state('AddContactCircle',{
			url: '/addcontactcircle',
			templateUrl: $rootscope + 'views/addContactCircle.html'
		})
		.state('AddContactCircleEs',{
			url: '/addcontactcircleEs',
			templateUrl: 'views/addContactCircleEs.html'
		})
		.state('EditCircle',{
			url: '/editcircle',
			templateUrl: $rootscope + 'views/editCircle.html'
		})
		.state('EditCircleEs',{
			url: '/editcircleEs',
			templateUrl: 'views/editCircleEs.html'
		})
//---------------- REQUEST STATES ------------------------
		.state('Requests',{
			url: '/requests',
			templateUrl: $rootscope + 'views/requests.html'
		})
		.state('RequestsEs',{
			url: '/requestsEs',
			templateUrl: 'views/requestsEs.html'
		})
		.state('AddRequest',{
			url: '/addrequest',
			templateUrl: $rootscope + 'views/addRequest.html'
		})
		.state('AddRequestEs',{
			url: '/addrequestEs',
			templateUrl: 'views/addRequestEs.html'
		})
		.state('EditRequest',{
			url: '/editrequest',
			templateUrl: $rootscope + 'views/editRequest.html'
		})
//---------------- USER PROFILE-ACCOUNT STATES ------------------------
		.state('Profile',{
			url: '/profile/:id',
			templateUrl: $rootscope + 'views/profile.html'
		})
		.state('ProfileEs',{
			url: '/perfil/:id',
			templateUrl: 'views/profileEs.html'
		})
		.state('EditProfile',{
			url: '/editProfile/:id',
			templateUrl: $rootscope + 'views/editProfile.html'
		})
		.state('EditProfileEs',{
			url: '/editProfile/:id',
			templateUrl: 'views/editProfileEs.html'
		})
		.state('Account',{
			url: '/account/:id',
			templateUrl: $rootscope + 'views/account.html'
		})
		.state('AccountEs',{
			url: '/account/:id',
			templateUrl: 'views/accountEs.html'
		})
//---------------- SIGN UP - SIGN IN STATES ------------------------
		.state('SignUpEs',{
			url: '/registrar',
			templateUrl: 'views/signupEs.html'
		})
		.state('SignUp',{
			url: '/signup',
			templateUrl: $rootscope + 'views/signup.html'
		})
		.state('SignIn',{
			url: '/signIn',
			templateUrl: $rootscope + 'views/signIn.html'
		})
		.state('SignInEs',{
			url: '/signInEs',
			templateUrl: 'views/signInEs.html'
		})
//---------------- RESET-FORGOT PASSWORD STATES ---------------
		.state('ForgotPassword',{
			url: '/forgotPassword',
			templateUrl: $rootscope + 'views/forgotPassword.html'
		})
		.state('ForgotPasswordEs',{
			url: '/forgotPasswordEs',
			templateUrl: 'views/forgotPasswordEs.html'
		})
		.state('ResetPassword',{
			url: '/resetPassword/:id',
			templateUrl: $rootscope + 'views/resetPassword.html'
		})
		.state('ResetPasswordEs',{
			url: '/resetPasswordEs/:id',
			templateUrl: 'views/resetPasswordEs.html'
		})
//---------------- NOTIFICATIONS STATES ---------------
		.state('Notifications',{
			url: '/notifications',
			templateUrl: $rootscope + 'views/notifications.html'
		})

//----------------  TOKEN FOR 3RD PARTY AUTH ---------------
		.state('Token',{
			url: '/token/:token',
			templateUrl: $rootscope + 'views/token.html'
		});

//----------------- OTHER ------------------------------------------------------
		$urlRouterProvider.otherwise('/');
		$httpProvider.interceptors.push("AuthInterceptor");
	}
})();
