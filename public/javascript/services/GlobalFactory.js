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

//FORGOT PASSWORD? SEND EMAIL
			o.forgot = function(user) {
					var q = $q.defer() ;
					$http.post('/api/user/forgot', user).success(function(res) {
						q.resolve() ;
					}) ;

					return q.promise ;
				} ;


	//Update PASSWORD
		o.resetPassword = function(editedUser) {
			var q = $q.defer();
			$http.put('/api/user/resetPassword/' + editedUser.id, editedUser).success(
				function(res){
					q.resolve(res);
				});
				return q.promise;
			}

//------------------LOGOUT------------------------------
		o.logout = function() {
	      removeToken();
	      o.status.username = null;
	      o.status._id = null;
	    };

// ----------------SIGN UP----------------------------
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

	//---------SIGN IN--------------------------------
		o.signIn = function(user){
			console.log("user.email: " + user.email);
			console.log("user.password: " + user.password);
			var q = $q.defer();
			$http.post('/api/user/signIn', user).then(function(res){
				setToken(res.data);
				setUser();
				var user = o.getUser();
				console.log(user);
				o.status.username = user.email;
				o.status._id = user._id;
				q.resolve(res.data);
			});
			return q.promise;
		};


//--------------------------------------------------------
		function setUser(){
		      var user = JSON.parse(urlBase64Decode(getToken().split('.')[1]));
		      o.status.username = user.email;
		      o.status._id = user._id;
		    }
		    function removeUser(){
		      o.status.username = null;
		      o.status._id = null;

		    }
		    function getToken() {
		      return localStorage.getItem('token');
		    }
		    function setToken(token) {
		      return localStorage.setItem('token',token);
		    }
		    function removeToken() {
		      return localStorage.removeItem('token');
		    }
		    function logout() {
		      removeToken();
		      removeUser();
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

			o.getUser = function() {
		      return JSON.parse(urlBase64Decode(getToken().split('.')[1]));
		    };




		return o;
	}
})();
