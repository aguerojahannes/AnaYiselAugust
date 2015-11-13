(function() {
	'use strict';
	angular.module('app')
	.controller('RequestsController', RequestsController);

	function RequestsController(HomeFactory, $state, $stateParams) {
		var vm = this;
		vm.contacts = HomeFactory.contacts;
		vm.circles = HomeFactory.circles;
		vm.requests = HomeFactory.requests;
		vm.newRequest = { privacy: 'Global' };
		vm.tempRequest = HomeFactory.tempRequest;
		vm.modalOn = false;
		vm.viewRequest = {};

		// On Load Scroll Window To Top
		window.scrollTo(0, 0);

		// Grab Contacts When Page Loads
		HomeFactory.getContacts().then(function(res) {
				vm.contacts = HomeFactory.contacts;
		});

		// Get Requests
		vm.getRequests = function() {
			HomeFactory.getRequests().then(function(res){
				vm.requests = HomeFactory.requests;
			});
		};
		vm.getRequests();

		// Add Request
		vm.addRequest = function (request) {
			request.$username_1 = new Date();
			HomeFactory.addRequest(request).then(function(res){
				vm.newRequest = { privacy: 'Global'};
				vm.getRequests();
				$state.go("Requests");
			});
		};

		// Delete Request
		vm.deleteRequest = function (id) {
			HomeFactory.deleteRequest(id).then(function(res){
				vm.getRequests();
			});
		};

		// Edit Request
		vm.editRequest = function(request) {
				HomeFactory.tempRequest = request;
				$state.go('EditRequest');
		};

		// Save Request
		vm.saveRequest = function(request) {
			HomeFactory.saveRequest(request).then(function(res) {
				vm.getRequests();
				$state.go("Requests");
			});
		};


	}
})();
