(function() {
	'use strict';
	angular.module('app')
	.controller('CirclesController', CirclesController);

	function CirclesController(HomeFactory, CirclesFactory, $state, $stateParams) {
		var vm = this;
		vm.circle = {};
		//vm.circle = CirclesFactory.circles;
		//vm.contacts = CirclesFactory.contacts;
		vm.canvas = document.getElementById('Canvas');
		vm.context = vm.canvas.getContext('2d');
		vm.centerX = vm.canvas.width / 2;
		vm.centerY = vm.canvas.height / 2;
		vm.radius = vm.canvas.height / 2 - 2;
		vm.canvasEmpty = true;


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
			// CirclesFactory.createCircle(vm.circle).then(function(){
			// 	$state.go('AddContactCircle'); //Create this state as next step.
			// });
			vm.context.clearRect(0, 0, vm.canvas.width, vm.canvas.height);

			vm.context.beginPath();
			vm.context.arc(vm.centerX, vm.centerY, vm.radius, 0, 1 * Math.PI, false);
			vm.context.fillStyle = 'rgba(0,0,0,.1)';
			vm.context.fill();
			vm.context.lineWidth = 2;
			vm.context.strokeStyle = 'rgba(0,0,0,.1)';
			vm.context.stroke();

			vm.canvasEmpty = false;
		};

		vm.deleteCircle = function() {

			// Clear Canvas
			vm.context.clearRect(0, 0, vm.canvas.width, vm.canvas.height);

			// Set Empty Variable To True
			vm.canvasEmpty = true;
		};

		// CirclesFactory.getContacts().then(function(res) {
		// 		vm.contacts = CirclesFactory.contacts;
		// });

		// On Load Get Contacts
		HomeFactory.getContacts().then(function(res) {
				vm.contacts = HomeFactory.contacts;
		});


		// On Load Scroll Window To Top
		window.scrollTo(0, 0);


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
