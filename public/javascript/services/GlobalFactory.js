(function() {
	'use strict';
	angular.module('app')
	.factory('GlobalFactory', GlobalFactory);

	function GlobalFactory($http, $q) {
		var o = {};
		o.setUser = setUser;
		o.setToken = setToken;
		o.status = {};
		if(getToken()){
			setUser();
		}

// ----------------SIGN UP----------------------------
	o.signUp = function(user){
		var q = $q.defer();
		$http.post("/api/user/signUp", user).then(function(res){
			setToken(res.data);
			setUser();
			var user = o.getUser();
			q.resolve(res.data);
		});
		return q.promise;
	};

//---------SIGN IN--------------------------------
	o.signIn = function(user){
		var q = $q.defer();
		$http.post('/api/user/signIn', user).then(function(res){
			setToken(res.data);
			setUser();
			q.resolve(res.data);
		});
		return q.promise;
	};

//------------FORGOT PASSWORD? SEND EMAIL--------------------------
	o.forgot = function(user) {
			var q = $q.defer() ;
			$http.post('/api/user/forgot', user).success(function(res) {
				q.resolve() ;
			}) ;

			return q.promise ;
		} ;


	//--------------------Update PASSWORD----------------------------------
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
				o.status.notifications = null;
	    };


//-------------------TOKEN------------------------------


	function setUser(){
	      var user = JSON.parse(urlBase64Decode(getToken().split('.')[1]));
	      o.status.username = user.email;
	      o.status._id = user._id;
				o.status.notifications = user.notifications;
	      o.status.email = user.email;
	      o.status.firstName = user.firstName;
	      o.status.lastName = user.lastName;
	      o.status.keyword = user.keyword; //skills
	      o.status.profilePic = user.profilePic;
	      o.status.circles = user.circles;
				o.status.skills = user.skills;
	      // o.status.friends = user.contacts;
	    }

	function removeUser(){

	      o.status.username = null;
	      o.status._id = null;
				o.status.notifications = null;
	      o.status.email = null;
	      o.status.firstName = null;
	      o.status.lastName = null;
	      o.status.keyword = null; //skills
	      o.status.profilePic = null;
	      o.status.circles = null;
	      o.status.friends = null;
				o.status.skills = null;
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

//-------- ACCOUNT--------------------------------------------

	o.deleteAccount = function(userId){
		var q = $q.defer();
		$http.delete("/api/user/" + userId).then(function(res){
			q.resolve(res);
		});
		return q.promise;
		}


//-------- PROFILE--------------------------------------------
	o.getUser = function(userId){ // used to get user information on account page and the public profile
	// o.getUser = function(userId){ // used to get user information on account page and the public profile
		var q = $q.defer();
		$http.get("/api/user/" + userId).then(function(res){
			q.resolve(res);
		});
		return q.promise;
	};

	o.updateUser = function(userId, user){  // used to update user information on account page or on the public profile
		var q = $q.defer();
		$http.put("/api/user/" + userId, user).then(function(res){
			q.resolve(res);
		});
		return q.promise;
	};

	//------------------CLOUDINARY PROFILE PIC UPLOAD --------------

	o.addProfileImage = function(image) {
		console.log(image);
		var q = $q.defer();
		$http.post("", image).success(function(res) {
			q.resolve(res);
		});
		return q.promise;
	}

	//------------------Friend Requests -------------------------------------

	// Get Friends
	o.getFriends = function() {
		var q = $q.defer();
		var parcel = {
			user: o.status.username
		}
		$http.post("/api/user/getFriends", parcel).then(function(res){
			q.resolve(res);
		});
		return q.promise;
	}

	// Accept Request
	o.acceptRequest = function(request) {
		var q = $q.defer();
		var parcel = {
			user: o.status.username,
			acccepted: request
		}
		o.status.notifications.splice(o.status.notifications.indexOf(request), 1);
		$http.post("/api/user/acceptRequest", parcel).then(function(res){
			q.resolve(res);
		});
		return q.promise;
	}

	// Decline Request
	o.declineRequest = function(request) {
		o.status.notifications.splice(o.status.notifications.indexOf(request), 1);
		o.status.notifications.splice(o.status.notifications.indexOf(request), 1);
		var q = $q.defer();
		var parcel = {
			user: o.status.username,
			declined: request
		}
		$http.post("/api/user/declineRequest", parcel).then(function(res){
			q.resolve(res);
		});
		return q.promise;
	}


	// Send Referral
	o.sendReferral = function (referral, target){
		var q = $q.defer();
		var parcel = {
			referral: referral,
			sendingTo: target
		}
		$http.post("/api/user/referral", parcel).then(function(res){
			q.resolve(res);
		});
		return q.promise;
	};

	return o;
	}
})();
