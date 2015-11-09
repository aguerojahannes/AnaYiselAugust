(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};
		o.contacts = [];



		/* -------------------- Contacts ---------------------------*/

		/* Get Contacts */
		o.getContacts = function() {
			var q = $q.defer();
			$http.get('/contacts').then(function(res) {
				o.contacts = res.data;
				q.resolve(res.data);
			});
			return q.promise;
		}

		/* Add Contact */
		o.addContact = function(contact) {
			var q = $q.defer();
			$http.post('/contacts', contact).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		}

		/* Delete Contact */
		o.deleteContact = function(id) {
			var q = $q.defer();
			$http.delete('/contacts/' + id).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		}

		/* -------------------- Circles ---------------------------*/

		/* Get Circles */
		o.getContacts = function() {
			var q = $q.defer();
			$http.get('/contacts').then(function(res) {
				o.contacts = res.data;
				q.resolve(res.data);
			});
			return q.promise;
		}

		/* Add Circle */
		o.addContact = function(contact) {
			var q = $q.defer();
			$http.post('/contacts', contact).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		}

		/* Delete Circle */
		o.deleteContact = function(id) {
			var q = $q.defer();
			$http.delete('/contacts/' + id).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		}

		return o;
	}
})();
