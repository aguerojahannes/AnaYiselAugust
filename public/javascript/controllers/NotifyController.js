(function() {
	'use strict';
	angular.module('app')
	.controller('NotifyController', NotifyController);

	function NotifyController() {
		var vm = this;
		vm.contactRequests = [{name: "August Gieseman", date: new Date()}, {name: "Steve Robert", date: new Date()}];

		// On Load Scroll Window To Top
		window.scrollTo(0, 0);



	}
})();
