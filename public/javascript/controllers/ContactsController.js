(function() {
	'use strict';
	angular.module('app')
	.controller('ContactsController', ContactsController);

	function ContactsController(HomeFactory, $state, $stateParams, $scope, GlobalFactory) {
		var vm = this;
		vm.contacts = HomeFactory.contacts;
		vm.tempContact = HomeFactory.tempContact;
		vm.viewContact = {};
		vm.modalOn = false;
		vm.emailReq = '';
		vm.errorText = '';
		vm.newContact = { skills: [], skill: '' };


		// Makes the input box lowercase
  	$scope.query = '';
  	$scope.$watch('query', function() {
  	    $scope.query = $scope.query.toLowerCase();
  	});

		// Handle Form Submission
		vm.handleAddForm = function(request, skill){

			// Handle Nesting Forms
			if (vm.newContact.skill === '') {
				vm.addContact(request);
			} else {
				vm.addNewSkill(skill);
			}
		};


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


		//------------------Add New Skill ------------------------------------
				vm.addNewSkill = function (skill) {
					for (var x=0; x < vm.newContact.skills.length; x++) {
						if(skill === vm.newContact.skills[x]) {
							vm.errorText = "You have already added " + vm.newContact.skills[x] + " as a skill!";
							vm.newContact.skill = "";
							return null;
						}
					}
					vm.newContact.skills.push(skill);
					vm.newContact.skill = "";
					vm.errorText = "";
				};

		//------------------Delete New Skill ------------------------------------
		vm.deleteSkill = function(skill) {
			vm.newContact.skills.splice(vm.newContact.skills.indexOf(skill), 1);
		};
	}
})();
