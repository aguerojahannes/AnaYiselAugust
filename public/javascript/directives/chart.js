// PIE CHART - Code looked on: http://jsfiddle.net/i_heart_php/zh1g5305/
google.setOnLoadCallback(function () {
    // angular.bootstrap(document.body, ['app']);
});
google.load('visualization', '1', {
    packages: ['corechart']
});

angular.module('app')

.directive('pieChart', function ($timeout) {
    return {
        restrict: 'EA',
        scope: {
            title: '@title',
            width: '@width',
            height: '@height',
            data: '=data',
            selectFn: '&select'
        },
        link: function ($scope, $elm, $attr) {

            // Create the data table and instantiate the chart
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'contact');
            data.addColumn('number', 'Value');
            var chart = new google.visualization.PieChart($elm[0]);

            draw();

            // Watches, to refresh the chart when its data, title or dimensions change
            $scope.$watch('data', function () {
                draw();
            }, true); // true is for deep object equality checking
            $scope.$watch('title', function () {
                draw();
            });
            $scope.$watch('width', function () {
                draw();
            });
            $scope.$watch('height', function () {
                draw();
            });

            // Chart selection handler
            google.visualization.events.addListener(chart, 'select', function () {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    $scope.$apply(function () {
                        $scope.selectFn({
                            selectedRowIndex: selectedItem.row
                        });
                    });
                }
            });

            function draw() {
                if (!draw.triggered) {
                    draw.triggered = true;
                    $timeout(function () {
                        draw.triggered = false;
                        var label, value;
                        data.removeRows(0, data.getNumberOfRows());
                        angular.forEach($scope.data, function (row) {
                            label = row[0];
<<<<<<< HEAD:public/javascript/directives/directives.js
                            value = (row[1], 5);
=======
                            value = 1;
>>>>>>> 9dfae5cc646c6a098d0574746b43d99861e9b9b5:public/javascript/directives/chart.js
                            if (!isNaN(value)) {
                                data.addRow([row[0], 1]);
                            } //parseFloat
                        });
                        var options = {
                            'title': $scope.title,
<<<<<<< HEAD:public/javascript/directives/directives.js
                                'width': 800,   //$scope.width and $scope.height
                                'height': 600
=======
                            'width': $scope.width,
                            'backgroundColor': 'transparent',
                            'is3D': false,
                            'pieHole': .75,
                            'chartArea':{width:'100%',height:'75%'},
                            'legend': {
                              'textStyle': { color: 'white', bold: false, italic: true }
                            },
                            'height': $scope.height
>>>>>>> 9dfae5cc646c6a098d0574746b43d99861e9b9b5:public/javascript/directives/chart.js
                        };
                        chart.draw(data, options);
                        // No row selected
                        $scope.selectFn({
                            selectedRowIndex: undefined
                        });
                    }, 0, true);
                }
            }
        }
    };
});
