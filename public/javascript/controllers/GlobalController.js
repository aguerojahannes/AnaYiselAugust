(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(GlobalFactory, $state, $stateParams) {
		var glob = this;
		glob.user = {};

// SIGN UP
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

//SIGN IN
		glob.signIn = function() {
			GlobalFactory.signIn(glob.user).then(function(){
				console.log("made it back to controller.")
				$state.go('Profile');
			});
		};
		glob.signInEs = function() {
			GlobalFactory.signIn(glob.user).then(function(){
				$state.go('ProfileEs');
			});
		};


// LOGOUT



	}
})();
