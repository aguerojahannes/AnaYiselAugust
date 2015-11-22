(function() {
	'use strict';
	angular.module('app')
	.controller('CirclesController', CirclesController);
	function CirclesController(HomeFactory, $scope, $state) {
		var vm = this;

// PIE CHART - Code looked on: http://jsfiddle.net/i_heart_php/zh1g5305/
		// Initial chart data
		    $scope.chartTitle = "Give a Name to your Circle";
		    $scope.chartWidth = 600;
		    $scope.chartHeight = 600;
		    $scope.chartData = [
		        ['Name 1', 1],
		        ['Name 2', 1],
		        ['Name 3', 1],
		        ['Name 4', 1],
		        ['Name 5', 1]
		    ];


		// console.log(vm.contacts);
		// // Initial chart data
		//     $scope.chartTitle = "";
		//     $scope.chartWidth = 1000;
		//     $scope.chartHeight = 500;
		//     $scope.chartData = [
		// 			['New Contact']
		// 		];


		    $scope.deleteRow = function (index) {
		        $scope.chartData.splice(index, 1);
		    };
		    $scope.addRow = function () {
		        $scope.chartData.push([]);
		    };
		    $scope.selectRow = function (index) {
		        $scope.selected = index;
		    };
		    $scope.rowClass = function (index) {
		        return ($scope.selected === index) ? "selected" : "";
		    };

//Submit-Create Circle
				vm.submitCircle = function(){
					console.log($scope.chartData, $scope.chartTitle);
					HomeFactory.submitCircle($scope.chartData, $scope.chartTitle).then(function(res){
						console.log(res.data);
						$state.go('CreateCircle');
					});
				};

//DISPLAY CIRCLES
				HomeFactory.getAllCircles().then(function(res){
					vm.pieChart = res;
				});

				// vm.contacts = HomeFactory.contacts;

				// // Get Contacts
				// HomeFactory.getContacts().then(function() {
				// 	vm.contacts = HomeFactory.contacts;
				// 	console.log(vm.contacts);
				// });



	}
})();
