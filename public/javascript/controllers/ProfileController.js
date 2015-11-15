(function() {
	'use strict';
	angular.module('app')
	.controller('ProfileController', ProfileController);
// Inject Upload, $http, $mdToast to work with cloudinary.
	function ProfileController(GlobalFactory, $state, $stateParams, $http, $mdToast, $scope, Upload) {
		var vm = this;
		vm.profile = {};
		vm.status = GlobalFactory.status;
		vm.loading = false;

		// vm.userInfoLoaded = false; //add to work with cloudinary

//--------------- Upload Photo w. Cloudinary --------------------------
//Select or drop file to upload function
$scope.upload = function (file) {
    	vm.loading = true;
    	Upload.upload({
    		url: '/api/user/uploadPhoto',
    		data: {file: file, 'userId': vm.status._user.id}
    	}).then(function (resp) {
    		vm.loading = false;
				$mdToast.show($mdToast.simple().content('Please relogin to show changes'))
    	}, function (resp) {
    		vm.loading = false;
    	}, function (evt) {
    		var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    	});
    };


//SUBMIT THE UPLOAD PHOTO file
$scope.submit = function() {
			if ($scope.form.file.$valid && $scope.file && !$scope.file.$error) {
				$scope.upload($scope.file);
			}
		};
//------------------------ END CLOUDINARY -------------------------------


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
