(function() {
	'use strict';
	angular.module('app')
	.controller('CirclesController', CirclesController);

	function CirclesController(HomeFactory, $state, $stateParams) {
		var vm = this;
		vm.contacts = HomeFactory.contacts;
		vm.circles = HomeFactory.circles;

		HomeFactory.getContacts().then(function(res) {
				vm.contacts = HomeFactory.contacts;
		});

		// // Get Circles
		// vm.getCircles = function() {
		// 	HomeFactory.getContacts().then(function(res){
		// 		vm.contacts = res;
		// 	});
		// };
		// vm.getContacts();
		//
		// // Add Circle
		// vm.addCircle = function() {
		// 	vm.newContact.createdOn = new Date();
		// 	vm.newContact.username = new Date();
		// 	HomeFactory.addContact(vm.newContact).then(function(res){
		// 		alert("Contact Added");
		// 		vm.newContact = {};
		// 		vm.getContacts();
		// 	});
		// };
		//
		// // Delete Circle
		// vm.deleteCircle = function(id) {
		// 	HomeFactory.deleteContact(id).then(function(res) {
		// 		vm.getContacts();
		// 	});
		// };

	}
})();
