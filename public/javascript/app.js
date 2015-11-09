(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
		}).state('Contacts',{
			url: '/',
			templateUrl: 'views/contacts.html'
		}).state('Circles',{
			url: '/',
			templateUrl: 'views/circles.html'
		}).state('Requests',{
			url: '/',
			templateUrl: 'views/requests.html'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
