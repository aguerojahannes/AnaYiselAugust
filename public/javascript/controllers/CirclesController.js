(function() {
	'use strict';
	angular.module('app')
	.controller('CirclesController', CirclesController);

	function CirclesController(HomeFactory, CirclesFactory, $state, $stateParams) {
		var vm = this;
		vm.circle = {};



		// On Load Get Contacts
		HomeFactory.getContacts().then(function(res) {
				vm.contacts = HomeFactory.contacts;
		});


		// On Load Scroll Window To Top
		window.scrollTo(0, 0);


		// Make Circle
		vm.createCircle = function () {


		}

		vm.deleteCircle = function() {


		};



		/* Helper Functions */



	}
})();
