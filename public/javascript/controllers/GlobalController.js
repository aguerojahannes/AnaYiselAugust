(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(GlobalFactory, $state, $stateParams, $scope) {
		var glob = this;
		glob.user = {};

		// Bring State To Document
		$scope.$state = $state;

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
