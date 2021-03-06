angular.module('app.services', [])

.factory('GlobalFactory', function($q,$http) {
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



//-------------------TOKEN------------------------------

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
    var q = $q.defer();
    $http.get("http://localhost:3000/api/user/" + userId).then(function(res){
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


    return o;

})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
