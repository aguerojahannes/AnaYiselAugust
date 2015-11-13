(function() {
	'use strict';
	angular.module('app')
	.controller('ProfileController', ProfileController);

	function ProfileController(GlobalFactory, $state, $stateParams) {
		var vm = this;
		vm.profile = {};
		vm.status = GlobalFactory.status;


		// vm.displayProfile = function(){
		// 	GlobalFactory.getUser($stateParams.id).then(function(res){
		// 		vm.profile = res.data;
		// 		console.log(vm.profile);
		// 	});
		// };

		function displayProfile(){
			GlobalFactory.getUser($stateParams.id).then(function(res){
				vm.profile = res.data;
				console.log(vm.profile);
			});
		};
		displayProfile();


		vm.updateProfile = function(){
			GlobalFactory.updateUser($stateParams.id, vm.profile).then(function(res){
				vm.profile = res.data; // need this?
				$state.go("Profile", {id: vm.status._id});
			});
		};

		// On Load Scroll Window To Top
		window.scrollTo(0, 0);


	}
})();
