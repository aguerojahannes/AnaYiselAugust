(function() {
	'use strict';
	angular.module('app')
	.controller('NotifyController', NotifyController);

	function NotifyController(GlobalFactory, $state, $stateParams) {
		var vm = this;
		vm.contactRequests = GlobalFactory.status.notifications;
		console.log(vm.contactRequests);

		// On Load Scroll Window To Top
		window.scrollTo(0, 0);

		vm.acceptRequest = function(request) {
			console.log(request);
			vm.contactRequests.splice(vm.contactRequests.indexOf(request), 1);

			GlobalFactory.acceptRequest(request).then(function() {
				alert("Accepted!");
			});
		};

		vm.declineRequest = function(request) {
			console.log(request);
			vm.contactRequests.splice(vm.contactRequests.indexOf(request), 1);

			GlobalFactory.declineRequest(request).then(function() {
				alert("Declined!");
			});
		};

	}
})();
