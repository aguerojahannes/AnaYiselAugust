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




	}
})();









// (function() {
// 	'use strict';
// 	angular.module('app')
// 	.controller('CirclesController', CirclesController, function ($scope) {
// 		function CirclesController(HomeFactory, CirclesFactory, $state, $stateParams) {
// 			var vm = this;
// 			vm.circle = {};
//
// 				    // Initial chart data // PIE CHART
// 	    $scope.chartTitle = "Add contacts to your Circle";
// 	    $scope.chartWidth = 500;
// 	    $scope.chartHeight = 320;
// 	    $scope.chartData = [
// 	        ['NAME', 5],
// 	        ['Web (Organic)', 3],
// 	        ['Web (PPC)', 2],
// 	        ['Yellow Pages', 4],
// 	        ['Showroom', 11]
// 	    ];
//
// 	    $scope.deleteRow = function (index) {
// 	        $scope.chartData.splice(index, 1);
// 	    };
// 	    $scope.addRow = function () {
// 	        $scope.chartData.push([]);
// 	    };
// 	    $scope.selectRow = function (index) {
// 	        $scope.selected = index;
// 	    };
// 	    $scope.rowClass = function (index) {
// 	        return ($scope.selected === index) ? "selected" : "";
// 	    };
//
//
// 	//------------------------------- END --------------------------------------
//
//
//
// 	// // function CirclesController(HomeFactory, CirclesFactory, $state, $stateParams) {
// 	// // 	var vm = this;
// 	// // 	vm.circle = {};
// 	//
// 	//
// 	//
// 	// 	// On Load Get Contacts
// 	// 	HomeFactory.getContacts().then(function(res) {
// 	// 			vm.contacts = HomeFactory.contacts;
// 	// 	});
// 	//
// 	//
// 	// 	// On Load Scroll Window To Top
// 	// 	window.scrollTo(0, 0);
// 	//
// 	//
// 	// 	// Make Circle
// 	// 	vm.createCircle = function () {
// 	//
// 	//
// 	// 	}
// 	//
// 	// 	vm.deleteCircle = function() {
// 	//
// 	//
// 	// 	};
// 	//
// 	//
// 	//
// 	// 	/* Helper Functions */
//
//
//
// 	}
// })();
