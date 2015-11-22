(function() {
	'use strict';
	angular.module('app')
	.controller('CirclesController', CirclesController);

	function CirclesController(HomeFactory, $scope, GlobalFactory) {
		var vm = this;
		vm.contacts = HomeFactory.contacts;
		vm.circles = HomeFactory.circles;
		$scope.chartTitle = "New Circle";
		$scope.chartWidth = 1000;
		$scope.chartHeight = 500;
		$scope.chartData = [];


		// Get Contacts
		HomeFactory.getContacts().then(function() {
			vm.contacts = HomeFactory.contacts;
		});

		// Get Circles
		HomeFactory.getCircles().then(function() {
			vm.circles = HomeFactory.circles;
		});
	 console.log(vm.circles);

		// Save Circle
		vm.saveCircle = function(circle) {
			HomeFactory.saveCircle(circle).then(function(res){
				alert("Circle Saved!");
			});
		};



		// Google Charts
	    $scope.deleteRow = function (index) {
	        $scope.chartData.splice(index, 1);
	    };
	    $scope.addRow = function (contact) {
          $scope.chartData.push(contact);
	    };
	    $scope.selectRow = function (index) {
	        $scope.selected = index;
	    };
	    $scope.rowClass = function (index) {
	        return ($scope.selected === index) ? "selected" : "";
		  };


	}
})();
