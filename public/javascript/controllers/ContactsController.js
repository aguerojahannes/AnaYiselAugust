(function() {
	'use strict';
	angular.module('app')
	.controller('ContactsController', ContactsController);

	function ContactsController(HomeFactory, $state, $stateParams) {
		var vm = this;
		vm.contacts = HomeFactory.contacts;
		vm.tempContact = HomeFactory.tempContact;

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
				vm.newContact = {};
				vm.getContacts();
				$state.go("Contacts");
			});
		};

		// Delete Contact
		vm.deleteContact = function(id) {
			HomeFactory.deleteContact(id).then(function(res) {
				vm.getContacts();
			});
		};

		// Edit Contact
		vm.editContact = function(contact) {
				HomeFactory.tempContact = contact;
				$state.go('EditContact');
		};

		// Save Contact
		vm.saveContact = function(contact) {
			HomeFactory.saveContact(contact).then(function(res) {
				vm.getContacts();
				$state.go("Contacts");
			});
		};


	}
})();
