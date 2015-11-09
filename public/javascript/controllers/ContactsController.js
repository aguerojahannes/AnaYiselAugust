(function() {
	'use strict';
	angular.module('app')
	.controller('ContactsController', ContactsController);

	function ContactsController(HomeFactory, $state, $stateParams) {
		var vm = this;
		vm.contacts = HomeFactory.contacts;

		// Get Contacts
		vm.getContacts = function() {
			HomeFactory.getContacts().then(function(res){
				vm.contacts = HomeFactory.contacts;
			});
		};
		vm.getContacts();

		// Add Contact
		vm.addContact = function() {
			vm.newContact.createdOn = new Date();
			vm.newContact.username = new Date();
			HomeFactory.addContact(vm.newContact).then(function(res){
				alert("Contact Added");
				vm.newContact = {};
				vm.getContacts();
			});
		};

		// Delete Contact
		vm.deleteContact = function(id) {
			HomeFactory.deleteContact(id).then(function(res) {
				vm.getContacts();
			});
		};

	}
})();
