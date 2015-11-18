(function() {
	'use strict';
	angular.module('app')
	.controller('CirclesController', CirclesController);

	function CirclesController(HomeFactory, CirclesFactory, $state, $stateParams) {
		var vm = this;
		vm.circle = {};
		vm.canvas = document.getElementById('Canvas');
		vm.context = vm.canvas.getContext('2d');

		// Circle Data
		var data = [60, 60, 60, 60, 60, 60];
		var labels = ["60", "60", "60", "60", "60", "60"];
		var colors = ["rgba(0,0,0,.1)", "rgba(0,0,0,.2)", "rgba(0,0,0,.1)", "rgba(0,0,0,.2)", "rgba(0,0,0,.1)", "rgba(0,0,0,.2)"];
		vm.canvasEmpty = true;

		// On Load Get Contacts
		HomeFactory.getContacts().then(function(res) {
				vm.contacts = HomeFactory.contacts;
		});


		// On Load Scroll Window To Top
		window.scrollTo(0, 0);


		// Make Circle
		vm.createCircle = function (canvas, context, i) {

			context.save();
	    var centerX = canvas.width / 2;
	    var centerY = canvas.height / 2;
	    vm.radius = canvas.height / 2 - 2;

	    var startingAngle = degreesToRadians(sumTo(data, i));
	    var arcSize = degreesToRadians(data[i]);
	    var endingAngle = startingAngle + arcSize;

	    context.beginPath();
	    context.moveTo(centerX, centerY);
	    context.arc(centerX, centerY, vm.radius,
	                startingAngle, endingAngle, false);
	    context.closePath();

	    context.fillStyle = colors[i];
	    context.fill();
			context.lineWidth = 4;
			context.strokeStyle = '#fff';
			context.stroke();

	    context.restore();

	    // drawSegmentLabel(canvas, context, i);

			vm.canvasEmpty = false;
		}

		vm.deleteCircle = function() {

			// Clear Canvas
			vm.context.clearRect(0, 0, vm.canvas.width, vm.canvas.height);

			// Set Empty Variable To True
			vm.canvasEmpty = true;
		};



		/* Helper Functions */

		function degreesToRadians(degrees) {
    	return (degrees * Math.PI)/180;
		}

		function sumTo(a, i) {
		  var sum = 0;
		  for (var j = 0; j < i; j++) {
		    sum += a[j];
		  }
		  return sum;
		}

		function drawSegmentLabel(canvas, context, i) {
		   context.save();
		   var x = Math.floor(canvas.width / 2);
		   var y = Math.floor(canvas.height / 2);
		   var angle = degreesToRadians(sumTo(data, i));

		   context.translate(x, y);
		   context.rotate(angle);
		   var dx = Math.floor(canvas.width * 0.5) - 10;
		   var dy = Math.floor(canvas.height * 0.05);

		   context.textAlign = "center";
		   var fontSize = Math.floor(canvas.height / 25);
		   context.font = fontSize + "pt Helvetica";

		   context.fillText(labels[i], dx, dy);

		   context.restore();
		}


		vm.makeCircle = function () {

			vm.deleteCircle();

			// Make Circle
			for (var i = 0; i < data.length; i++) {
				vm.createCircle(vm.canvas, vm.context, i);
			}
		}



	}
})();
