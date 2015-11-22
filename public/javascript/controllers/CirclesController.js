(function() {
	'use strict';
	angular.module('app')
	.controller('CirclesController', CirclesController);

	function CirclesController(HomeFactory, $scope, GlobalFactory, $state) {
		var vm = this;


// // PIE CHART - Code looked on: http://jsfiddle.net/i_heart_php/zh1g5305/
// 		// Initial chart data
// 		    $scope.chartTitle = "Give a Name to your Circle";
// 		    $scope.chartWidth = 600;
// 		    $scope.chartHeight = 600;
// 		    $scope.chartData = [
// 		        ['Name 1', 1],
// 		        ['Name 2', 1],
// 		        ['Name 3', 1],
// 		        ['Name 4', 1],
// 		        ['Name 5', 1]
// 		    ];
//
//
// 		// console.log(vm.contacts);
// 		// // Initial chart data
// 		//     $scope.chartTitle = "";
// 		//     $scope.chartWidth = 1000;
// 		//     $scope.chartHeight = 500;
// 		//     $scope.chartData = [
// 		// 			['New Contact']
// 		// 		];
//
//
// 		    $scope.deleteRow = function (index) {
// 		        $scope.chartData.splice(index, 1);
// 		    };
// 		    $scope.addRow = function () {
// 		        $scope.chartData.push([]);
// 		    };
// 		    $scope.selectRow = function (index) {
// 		        $scope.selected = index;
// 		    };
// 		    $scope.rowClass = function (index) {
// 		        return ($scope.selected === index) ? "selected" : "";
// 		    };
//
// //Submit-Create Circle
// 				vm.submitCircle = function(){
// 					console.log($scope.chartData, $scope.chartTitle);
// 					HomeFactory.submitCircle($scope.chartData, $scope.chartTitle).then(function(res){
// 						console.log(res.data);
// 						$state.go('CreateCircle');
// 					});
// 				};
//
// //DISPLAY CIRCLES
// 				HomeFactory.getAllCircles().then(function(res){
// 					vm.pieChart = res;
// 				});
//
// 				// vm.contacts = HomeFactory.contacts;
//
// 				// // Get Contacts
// 				// HomeFactory.getContacts().then(function() {
// 				// 	vm.contacts = HomeFactory.contacts;
// 				// 	console.log(vm.contacts);
// 				// });

		vm.contacts = HomeFactory.contacts;
		vm.circles = HomeFactory.circles;
		vm.tempCircle = HomeFactory.tempCircle;
		vm.errorText = "";

		$scope.chartTitle = "";
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

		// Save Circle
		vm.saveCircle = function(circle) {
			var title = $scope.chartTitle;
			HomeFactory.saveCircle(circle, title).then(function(res){
				$scope.chartData = [];
				$scope.chartTitle = "";
				$state.go("DisplayCircle");
			});
		};

		// Edit Circle
		vm.editCircle = function(circle) {
			HomeFactory.tempCircle = circle;
			$state.go("EditCircle");
		};

		// Fix
		vm.initCircle = function() {
			for(var x=0;x<HomeFactory.tempCircle.members.length;x++) {
				$scope.addRow(HomeFactory.tempCircle.members[x]);
			}
			$scope.chartTitle = HomeFactory.tempCircle.chartTitle;
			console.log($scope.chartData);
		};

		// Update Circle
		vm.updateCircle = function(circle) {
			var title = $scope.chartTitle;
			HomeFactory.updateCircle(circle, title).then(function(res){
				$scope.chartData = [];
				$scope.chartTitle = "";
				$state.go("DisplayCircle");
			});
		};


		// Google Charts
	    $scope.deleteRow = function (index) {
	        $scope.chartData.splice(index, 1);
	    };
	    $scope.addRow = function (contact) {
				// For Every Contact, Check For Dupes
				for(var x=0; x<$scope.chartData.length; x++) {
					if($scope.chartData[x]._id === contact._id) {
						vm.errorText = "You have already added this contact!";
						return null;
					}
				}
				// Else Push Contact Into Circle
				$scope.chartData.push(contact);
				vm.errorText = '';
	    };
	    $scope.selectRow = function (index) {
	        $scope.selected = index;
	    };
	    $scope.rowClass = function (index) {
	        return ($scope.selected === index) ? "selected" : "";
		  };



	}
})();
