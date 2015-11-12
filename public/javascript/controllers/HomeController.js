(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController() {
		var vm = this;
		vm.title = 'Welcome to our App!';

		// On Load Scroll Window To Top
		window.scrollTo(0, 0);
	}
})();
