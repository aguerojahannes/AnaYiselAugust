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

	function ContactsController(HomeFactory, $state, $stateParams, $scope, GlobalFactory) {
		var vm = this;
		vm.contacts = HomeFactory.contacts;
		vm.tempContact = HomeFactory.tempContact;
		vm.viewContact = {};
		vm.modalOn = false;
		vm.emailReq = '';
		vm.errorText = '';


		// Makes the input box lowercase
  	$scope.query = '';
  	$scope.$watch('query', function() {
  	    $scope.query = $scope.query.toLowerCase();
  	});

  	// Only search certain properties
    vm.searchContacts = function(contact) {
        return (
          angular.lowercase(contact.firstName).indexOf($scope.query || '') !== -1 ||
					angular.lowercase(contact.lastName).indexOf($scope.query || '') !== -1 ||
          angular.lowercase(contact.title).indexOf($scope.query || '') !== -1);
    };


		// On Load Scroll Window To Top
		window.scrollTo(0, 0);


		// Get Contacts
		vm.getContacts = function() {
			HomeFactory.getContacts().then(function(res){
				vm.contacts = HomeFactory.contacts;
			});
		};
		vm.getContacts(); // Fire Initially


		// Add Contact
		vm.addContact = function() {
			vm.newContact.createdOn = new Date();
			vm.newContact.creator = GlobalFactory.status.username;

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
 /* -------------------- Send Friend Request ----------------------------------------------*/

 	vm.sendRequest = function(email) {
		  if(email === undefined || email === '') {
				vm.errorText = "Please enter a valid email address";
				return null;
			}
			HomeFactory.sendRequest(email).then(function(res) {1
				alert("Request Sent!");
				vm.emailReq = '';
			});
	}

 /* -------------------- LinkedIn ----------------------------------------------*/
		// Get LinkedIn Contacts
		vm.getLinkedIn = function() {
			HomeFactory.getLinkedIn().then(function(res){
				console.log(res);
			});
		};

	}
})();
