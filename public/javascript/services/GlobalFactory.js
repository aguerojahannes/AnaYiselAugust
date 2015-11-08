(function() {
	'use strict';
	angular.module('app')
	.factory('GlobalFactory', GlobalFactory);

	function GlobalFactory($http, $q) {
		var o = {};
		o.status = {};
		if(getToken()){
			setUser();
		}

	
		// SIGN UP
		o.signUp = function(user){
			var q = $q.defer();
			$http.post("/api/user/signUp", user).then(function(res){
				setToken(res.data);
				setUser();
				var user = o.getUser();
				o.status.username = user.username;
				o.status._id = user._id;
				q.resolve(res.data);
			});
			return q.promise;
		};







		o.getUser = function(){
					return JSON.parse(urlBase64Decode(getToken().split(".")[1]));
				};

		function setUser(){
			var user = JSON.parse(urlBase64Decode(getToken().split(".")[1]));
			o.status.username = user.username;
			o.status._id = user._id;
			o.status.bio = user.bio;
		}

		function removeUser(){
			o.status.username = null;
			o.status._id = null;
		}

		function setToken(token){
			return localStorage.setItem("token", token);
		}

		function getToken(){
			return localStorage.getItem("token");
		}

		function removeToken(){
			return localStorage.removeItem("token");
		}

		function urlBase64Decode(str) {
			        var output = str.replace(/-/g, '+').replace(/_/g, '/');
			        switch (output.length % 4) {
			          case 0: { break; }
			          case 2: { output += '=='; break; }
			          case 3: { output += '='; break; }
			          default: {
			            throw 'Illegal base64url string!';
			          }
			        }
			        return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
			      }

		var token = getToken();
		o.status = {};
		if(token){
			var user = o.getUser();
			o.status.username = user.username;
			o.status._id = user._id;
			o.status.bio = user.bio;
		}

		if(getToken()) setUser();




		return o;
	}
})();
