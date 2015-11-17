(function() {
	'use strict';
	angular.module('app')
	.controller('ContactsController', ContactsController)
	// Custom Directive For Handling Enter Key For Skills -- Usage: ng-enter="doSomething()"
	.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });

	function ContactsController(HomeFactory, $state, $stateParams) {
		var vm = this;
		vm.contacts = HomeFactory.contacts;
		vm.tempContact = HomeFactory.tempContact;
		vm.viewContact = {};
		vm.modalOn = false;


		// On Load Scroll Window To Top
		window.scrollTo(0, 0);


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

			// If No ProfilePic, Assign Default Picture
			if(!vm.newContact.profilePic) {
				vm.newContact.profilePic = "https://www.k-state.edu/hcs/images/anonymous_silhouette.jpg";
			}

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
			// If No ProfilePic, Assign Default Picture
			if(!contact.profilePic) {
				contact.profilePic = "https://www.k-state.edu/hcs/images/anonymous_silhouette.jpg";
			}

			HomeFactory.saveContact(contact).then(function(res) {
				vm.getContacts();
				$state.go("Contacts");
			});
		};


 /* -------------------- LinkedIn ----------------------------------------------*/
		// Get LinkedIn Contacts
		vm.getLinkedIn = function() {
			HomeFactory.getLinkedIn().then(function(res){
				console.log(res);
			});
		};

	}
})();
