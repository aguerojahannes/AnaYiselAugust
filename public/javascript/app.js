(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		}).state('SignUp',{
			url: '/signup',
			templateUrl: 'views/signup.html'
		})
		.state('Profile',{
			url: '/profile',
			templateUrl: 'views/profile.html'
		}).state('SignUpEs',{
			url: '/registrar',
			templateUrl: 'views/signupEs.html'
		})
		.state('ProfileEs',{
			url: '/perfil',
			templateUrl: 'views/profileEs.html'
		}).state("LinkedInAuth", {
		      	url: '/auth/token/:token',
		    	template: "<h1>Authenticating</h1>",
		      	controller: ['$rootScope', "$stateParams", '$state', 'UserFactory', function($rootScope, $stateParams, $state, UF) {
		        	var vm = this;
		       	 localStorage.setItem("token", $stateParams.token);
		       	 UF.setLoggedinUserToRootScope();
		        	$state.go("QuestionsFeed");
		      }]
		    });
		$urlRouterProvider.otherwise('/');
	}
})();
