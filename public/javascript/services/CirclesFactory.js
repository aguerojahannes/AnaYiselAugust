(function() {
	'use strict';
	angular.module('app')
	.factory('CirclesFactory', CirclesFactory);

	function CirclesFactory($http, $q) {
		var o = {};

//ADD CONTACT IN CIRCLE
				// o.addContactCircle = function(contact) {
				// 	console.log(contact);
				// 	var q = $q.defer();
				// 	$http.post('/circles', contact).then(function(res) {
				// 		q.resolve(res.data);
				// 	});
				// 	return q.promise;
				// }

		// // POST Circle Form to the Data Base.
		// 		o.createCircle = function(circle){
		// 			console.log(circle);
		// 			var q = $q.defer();
		// 			$http.post('api/circles', circle).then(function(){
		// 				q.resolve();
		// 			});
		// 			return q.promise;
		// 		};






		return o;
	}
})();
