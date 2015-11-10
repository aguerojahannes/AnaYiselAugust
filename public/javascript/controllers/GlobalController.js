(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(GlobalFactory, $state, $stateParams) {
		var glob = this;
		glob.user = {};
//--------------- ADD THIS TO CHECK -----------------
		glob.isLogin = true; //switch between the login and register view on the login_register.html page
    glob.user = {};
    glob.status = GlobalFactory.status;
//------------------------------------------------------

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

//Logout
		glob.logout = function(){
			GlobalFactory.logout();
			$state.go('SignUp');
		};

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
			console.log("email: " + glob.user.email);
			console.log("password: " + glob.user.password);

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


	}
})();
