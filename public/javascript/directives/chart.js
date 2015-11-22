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

            // Watches, to refresh the chart when its data or title changes
            $scope.$watch('data', function () {
                draw();
            }, true); // true is for deep object equality checking
            $scope.$watch('title', function () {
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
<<<<<<< HEAD
                            label = row[0];
                            value = (row[1], 5);

                            // value = 1;

=======
                            label = row.firstName + " " + row.lastName;
                            value = 1;
>>>>>>> 380fa35c1f67cc3be43098fe70e4c68d9d077593
                            if (!isNaN(value)) {
                                data.addRow([label, value]);
                            }
                        });
                        var options = {
                            'title': $scope.title,
<<<<<<< HEAD
                            'width': 800,   //$scope.width and $scope.height
                            'height': 600,
                            // 'backgroundColor': 'transparent',
                            // 'is3D': false,
                            // 'pieHole': .75,
                            // 'chartArea':{width:'100%',height:'75%'},
                            // 'legend': {
                            //   'textStyle': { color: 'white', bold: false, italic: true }
                            // },
=======
                            'width': $scope.width,
                            'titlePosition': 'none',
                            'backgroundColor': 'transparent',
                            'is3D': false,
                            'pieHole': .75,
                            'colors': ['#F2B132', '#F69634', '#FB7C36', '#FF6138'],
                            'legend': {
                              'alignment': 'end',
                              'position': 'right',
                              'textStyle': { color: 'white', bold: false, italic: true }
                            },
                            'height': $scope.height
>>>>>>> 380fa35c1f67cc3be43098fe70e4c68d9d077593
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
