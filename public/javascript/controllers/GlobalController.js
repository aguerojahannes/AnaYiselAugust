(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(GlobalFactory, $state, $stateParams) {
		var glob = this;

		glob.user = {};

// SIGN UP - english, spanish
		glob.signUp = function() {
			GlobalFactory.signUp(glob.user).then(function(){
				$state.go("Profile");
			});
		};

		glob.signUpEs = function() {
			GlobalFactory.signUp(glob.user).then(function(){
				$state.go("ProfileEs");
			});
		};

// LOGIN


// LOGOUT



	}
})();
