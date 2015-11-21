(function() {
	'use strict';
	angular.module('app')
	.controller('CirclesController', CirclesController);
	function CirclesController(HomeFactory, $scope) {
		var vm = this;

		// Initial chart data
		    $scope.chartTitle = "Lead Sources";
		    $scope.chartWidth = 500;
		    $scope.chartHeight = 320;
		    $scope.chartData = [
		        ['Ad Flyers', 1],
		        ['Web (Organic)', 1],
		        ['Web (PPC)', 1],
		        ['Yellow Pages', 1],
		        ['Showroom', 1]
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
