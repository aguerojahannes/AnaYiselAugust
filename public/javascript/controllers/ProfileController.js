(function() {
	'use strict';
	angular.module('app')
	.controller('ProfileController', ProfileController);

	function ProfileController(GlobalFactory, $state, $stateParams) {
		var vm = this;
		vm.profile = {firstName: "Ana", lastName: "last name!", skills: "all these things", bio: "biohere"};





	}
})();
