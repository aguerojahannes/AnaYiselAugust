(function() {
	'use strict';
	angular.module('app')
	.controller('TokenController', TokenController);

	function TokenController(GlobalFactory,$state, $stateParams) {
		var vm = this;
		vm.status = GlobalFactory.status

		var x = $stateParams.token

		GlobalFactory.setToken(token);
		GlobalFactory.setUser();
		$state.go("Dashboard");


		// On Load Scroll Window To Top
		window.scrollTo(0, 0);
	}
})();
