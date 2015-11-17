(function() {
	'use strict';
	angular.module('app')
	.controller('AccountController', AccountController);

	function AccountController(GlobalFactory, $state, $stateParams, $mdDialog) {
		var vm = this;

		vm.changeName  = function(){

		};

		vm.changePassword = function(){

		};

		vm.changeLanguage = function(){
			// open modal
		};

		vm.status = '';
		vm.showConfirmDelete = function(){
			vm.confirmDelete = "confirm";
		};

// vm.showConfirmDelete = function(ev){
		// 	// open modal
		// 	vm.confirm = $mdDialog.confirm()
		// 	          .title('Would you like to delete your debt?')
		// 	          .content('All of the banks have agreed to <span class="debt-be-gone">forgive</span> you your debts.')
		// 	          .ariaLabel('Lucky day')
		// 	          .targetEvent(ev)
		// 	          .ok('Please do it!')
		// 	          .cancel('Sounds like a scam')
		// 	          template:
		// 	          '<md-dialog aria-label="Sample Dialog">' +
  //       '  <md-content>'+
  //       '    <md-list>'+
  //       '      <md-item ng-repeat="item in ctrl.items">'+
  //       '       <p>{{item}}</p>' +
  //       '      </md-item>'+
  //       '    </md-list>'+
  //       '  </md-content>' +
  //       '  <div class="md-actions">' +
  //       '    <md-button ng-click="ctrl.closeDialog()">' +
  //       '      Close Greeting' +
  //       '    </md-button>' +
  //       '  </div>' +
  //       '</md-dialog>';

		// 	    $mdDialog.show(confirm).then(function() {
		// 	      vm.status = 'You decided to get rid of your debt.';
		// 	    }, function() {
		// 	      vm.status = 'You decided to keep your debt.';
		// 	    });
		// };

		//   vm.hide = function() {
		//     $mdDialog.hide();
		//   };

		//   vm.cancel = function() {
		//     $mdDialog.cancel();
		//   };

		//   vm.answer = function(answer) {
		//     $mdDialog.hide(answer);
		//   };
// };

		vm.deleteAccount = function(){
			GlobalFactory.deleteAccount($stateParams.id).then(function(res){
				console.log("delete res: " + res);
				// close modal
				// open toast
				$state.go("SignUp");
			});
		};

	}
})();
