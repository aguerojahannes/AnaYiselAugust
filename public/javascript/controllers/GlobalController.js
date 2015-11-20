(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(GlobalFactory, $state, $stateParams, $scope, $window) {
		var glob = this;
		glob.user = {};
<<<<<<< HEAD
		glob.user.language = '';  //Testing if this works with keep User's language selection.

=======
>>>>>>> ce7a162eb06b9b8400839950e35b2ecc100e3dd5
//--------------- ADD THIS TO CHECK -----------------
		glob.isLogin = true; //switch between the login and register view on the login_register.html page
    		glob.user = {};
   		glob.status = GlobalFactory.status;
   		glob.user.language = "";

		// On Load Scroll Window To Top
		window.scrollTo(0, 0);

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


// SIGN UP
		glob.signUp = function() {
			glob.user.language = "english";
			GlobalFactory.signUp(glob.user).then(function(res){
				// golb.user = res.data;
				$state.go("Dashboard", {id: glob.status._id});

			});
		};

		glob.signUpEs = function() {
			GlobalFactory.signUp(glob.user).then(function(res){
				$state.go("Dashboard", {id: glob.status._id});
			});
		};

// LOG IN
		glob.signIn = function() {
			GlobalFactory.signIn(glob.user).then(function(){
				$state.go('Dashboard', {id: glob.status._id});
			});
		};
		glob.signInEs = function() {
			GlobalFactory.signIn(glob.user).then(function(){
				$state.go('Dashboard', {id: glob.user._id});
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
