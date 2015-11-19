(function() {
	'use strict';
	angular.module('app')
	.controller('RequestsController', RequestsController);

	function RequestsController(HomeFactory, $state, $stateParams, $scope, $timeout) {
		var vm = this;
		vm.contacts = HomeFactory.contacts;
		vm.circles = HomeFactory.circles;
		vm.requests = HomeFactory.requests;
		vm.newRequest = { privacy: 'Global', skills: [], skill: '' }; // Setting Default To Global So Select Element Doesn't Contain Blank Space At Top
		vm.tempRequest = HomeFactory.tempRequest;
		vm.modalOn = false;
		vm.viewRequest = {};
		vm.errorText = '';
		vm.selectPrivacy = [];
		vm.searchContact = '';

//-----------------On Load Scroll Window To Top---------------
		window.scrollTo(0, 0);

//------------------Grab Contacts When Page Loads--------------
		HomeFactory.getContacts().then(function(res) {
				vm.contacts = HomeFactory.contacts;
		});


// Handle Form Submission
	vm.handleAddForm = function(request, skill){

		// Handle Nesting Forms
		if (vm.newRequest.skill === '') {
			vm.addRequest(request);
		} else {
			vm.addNewSkill(skill)
		}

	};


	// Handle Adding Specific Contacts To Privacy
	vm.addSelectPrivacy = function(contact) {
		for(var i = 0; i < vm.selectPrivacy.length; i++) {
			if(vm.selectPrivacy.indexOf(contact) != -1) {
				vm.errorText = 'Contact has already been added!';
				vm.searchContact = '';
				return null
			}
		}
		vm.selectPrivacy.push(contact);
		vm.errorText = '';
		vm.searchContact = '';
	};

//-------------------------Get Requests------------------------
		vm.getRequests = function() {
			HomeFactory.getRequests().then(function(res){
				vm.requests = HomeFactory.requests;
				console.log(vm.requests);
			});
		};
		vm.getRequests();

//---------------------------- Add Request-----------------------
		vm.addRequest = function (request) {
			HomeFactory.addRequest(request).then(function(res){
				vm.newRequest = { privacy: 'Global', skills: [], skill: '' };
				vm.getRequests();
				$state.go("Requests");
			});
		};

//----------------------Delete Request-----------------------------
		vm.deleteRequest = function (id) {
			HomeFactory.deleteRequest(id).then(function(res){
				vm.getRequests();
			});
		};

//-------------------- Edit Request---------------------------------
		vm.editRequest = function(request) {
				HomeFactory.tempRequest = request;
				$state.go('EditRequest');
		};

//------------------Save Request------------------------------------
		vm.saveRequest = function(request) {
			HomeFactory.saveRequest(request).then(function(res) {
				vm.getRequests();
				$state.go("Requests");
			});
		};

//------------------Add New Skill ------------------------------------
		vm.addNewSkill = function (skill) {

			for (var x=0; x < vm.newRequest.skills.length; x++) {
				if(skill === vm.newRequest.skills[x]) {
					vm.errorText = "You have already added " + vm.newRequest.skills[x] + " as a skill!";
					vm.newRequest.skill = "";
					return null;
				}
			}
			vm.newRequest.skills.push(skill);
			vm.newRequest.skill = "";
			vm.errorText = "";
		}

		//------------------Delete New Skill ------------------------------------
		vm.deleteSkill = function(skill) {
			vm.newRequest.skills.splice(vm.newRequest.skills.indexOf(skill), 1);
		}
	}
})();
