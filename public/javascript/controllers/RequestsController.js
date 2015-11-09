(function() {
	'use strict';
	angular.module('app')
	.controller('RequestsController', RequestsController);

	function RequestsController(HomeFactory, $state, $stateParams) {
		var vm = this;
		vm.contacts = HomeFactory.contacts;
		vm.circles = HomeFactory.circles;

		HomeFactory.getContacts().then(function(res) {
				vm.contacts = HomeFactory.contacts;
		});
	}
})();
