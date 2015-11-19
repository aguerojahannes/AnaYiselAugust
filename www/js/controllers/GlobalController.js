(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(GlobalFactory, $state, $stateParams, $scope, $window) {
		var glob = this;
		glob.user = {};
//--------------- ADD THIS TO CHECK -----------------
		glob.isLogin = true; //switch between the login and register view on the login_register.html page
    		glob.user = {};
   		glob.status = GlobalFactory.status;

		// On Load Scroll Window To Top
		window.scrollTo(0, 0);

// --------- SIGN UP --------------------------
		glob.signUp = function() {
			console.log("sign up")
			GlobalFactory.signUp(glob.user).then(function(){
				$state.go("NewProfile");
			});
		};

		glob.signUpEs = function() {
			GlobalFactory.signUp(glob.user).then(function(){
				$state.go("NewProfileEs");
			});
		};

// ---------------- SIGN IN ----------------------------------------
		glob.signIn = function() {
			GlobalFactory.signIn(glob.user).then(function(){
				$state.go('Tab.Dash', {id: glob.status._id});
			});
		};
		glob.signInEs = function() {
			GlobalFactory.signIn(glob.user).then(function(){
				$state.go('Tab.Dash', {id: glob.user._id});
			});
		};

		// FORGOT PASSWORD? SEND EMAIL TO UPDATE
		glob.forgot = function() {
			GlobalFactory.forgot(glob.user).then(function() {
				$state.go('SignIn') ;
			}) ;
		};

//-----------UPDATE PASSWORD (LIKE EDIT)------------------
		glob.resetPassword = function(){
			glob.user.id = $stateParams.id ;
			GlobalFactory.resetPassword(glob.user).then(function(res){
				$state.go('Home');
			});
		};


// LOG OUT
		glob.logout = function(){
			GlobalFactory.logout();
			$state.go("Home");
			$window.location.href=("/");
		};

		// Bring State To Document
		$scope.$state = $state;

}
})();
