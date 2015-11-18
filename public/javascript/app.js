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
		.state('DashboardEs',{
			url: '/dashboardEs',
			templateUrl: 'views/dashboardEs.html'
		})
//---------------- CONTACTS STATES ------------------------
		.state('Contacts',{
			url: '/contacts',
			templateUrl: 'views/contacts.html'
		})
		.state('ContactsEs',{
			url: '/contactsEs',
			templateUrl: 'views/contactsEs.html'
		})
		.state('AddContact',{
			url: '/addcontact',
			templateUrl: 'views/addContact.html'
		})
		.state('AddContactEs',{
			url: '/addcontactEs',
			templateUrl: 'views/addContactEs.html'
		})
		.state('EditContact',{
			url: '/editcontact',
			templateUrl: 'views/editContact.html'
		})
		.state('EditContactEs',{
			url: '/editcontactEs',
			templateUrl: 'views/editContactEs.html'
		})
//---------------- CIRCLES STATES ------------------------
		.state('DisplayCircle',{
			url: '/displaycircle',
			templateUrl: 'views/displayCircle.html'
		})
		.state('DisplayCircleEs',{
			url: '/displaycircleEs',
			templateUrl: 'views/displayCircleEs.html'
		})
		.state('CreateCircle',{
			url: '/createcircle',
			templateUrl: 'views/createCircle.html'
		})
		.state('CreateCircleEs',{
			url: '/createcircleEs',
			templateUrl: 'views/createCircleEs.html'
		})
		.state('AddContactCircle',{
			url: '/addcontactcircle',
			templateUrl: 'views/addContactCircle.html'
		})
		.state('AddContactCircleEs',{
			url: '/addcontactcircleEs',
			templateUrl: 'views/addContactCircleEs.html'
		})
		.state('EditCircle',{
			url: '/editcircle',
			templateUrl: 'views/editCircle.html'
		})
		.state('EditCircleEs',{
			url: '/editcircleEs',
			templateUrl: 'views/editCircleEs.html'
		})
//---------------- REQUEST STATES ------------------------
		.state('Requests',{
			url: '/requests',
			templateUrl: 'views/requests.html'
		})
		.state('RequestsEs',{
			url: '/requestsEs',
			templateUrl: 'views/requestsEs.html'
		})
		.state('AddRequest',{
			url: '/addrequest',
			templateUrl: 'views/addRequest.html'
		})
		.state('AddRequestEs',{
			url: '/addrequestEs',
			templateUrl: 'views/addRequestEs.html'
		})
		.state('EditRequest',{
			url: '/editrequest',
			templateUrl: 'views/editRequest.html'
		})
//---------------- USER PROFILE-ACCOUNT STATES ------------------------
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
		.state('EditProfileEs',{
			url: '/editProfile/:id',
			templateUrl: 'views/editProfileEs.html'
		})
		.state('Account',{
			url: '/account/:id',
			templateUrl: 'views/account.html'
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
		.state('ForgotPasswordEs',{
			url: '/forgotPasswordEs',
			templateUrl: 'views/forgotPasswordEs.html'
		})
		.state('ResetPassword',{
			url: '/resetPassword/:id',
			templateUrl: 'views/resetPassword.html'
		})
		.state('ResetPasswordEs',{
			url: '/resetPasswordEs/:id',
			templateUrl: 'views/resetPasswordEs.html'
		})
//----------------  TOKEN FOR 3RD PARTY AUTH ---------------
		.state('Token',{
			url: '/token/:token',
			templateUrl: 'views/token.html'
		});
//----------------- OTHER ------------------------------------------------------
		$urlRouterProvider.otherwise('/');
		$httpProvider.interceptors.push("AuthInterceptor");
	}
})();
