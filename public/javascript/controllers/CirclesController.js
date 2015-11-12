(function() {
	'use strict';
	angular.module('app')
	.controller('CirclesController', CirclesController);

	function CirclesController(HomeFactory, CirclesFactory, $state, $stateParams) {
		var vm = this;
		vm.circle = {};
		//vm.circle = CirclesFactory.circles;
		//vm.contacts = CirclesFactory.contacts;

//----------ADD CONTACT IN CIRCLE (NEW O EXISTING).--------------------
		// vm.addContactCircle = function() {
		// 	vm.newContact.createdOn = new Date();
		// 	CirclesFactory.addContactCircle(vm.newContact).then(function(res){
		// 		alert("Contact Added!");
		// 		vm.newContact = {};
		// 		//vm.getContacts();
		// 	});
		// };

//--------CREATE A NEW CIRCLE WITH TITLE AND PIECES------------------
		vm.createCircle = function() {
			CirclesFactory.createCircle(vm.circle).then(function(){
				$state.go('AddContactCircle'); //Create this state as next step.
			});
		};


		// CirclesFactory.getContacts().then(function(res) {
		// 		vm.contacts = CirclesFactory.contacts;
		// });


		// // Get Circles
		// vm.getCircles = function() {
		// 	HomeFactory.getContacts().then(function(res){
		// 		vm.contacts = res;
		// 	});
		// };
		// vm.getContacts();



		// // Delete Circle
		// vm.deleteCircle = function(id) {
		// 	HomeFactory.deleteContact(id).then(function(res) {
		// 		vm.getContacts();
		// 	});
		// };

	}
})();
