(function() {
	'use strict';
	angular.module('app')
	.controller('CirclesController', CirclesController);
	function CirclesController(HomeFactory, $scope) {
		var vm = this;

		// Initial chart data
		    $scope.chartTitle = "";
		    $scope.chartWidth = 1000;
		    $scope.chartHeight = 500;
		    $scope.chartData = [];

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
