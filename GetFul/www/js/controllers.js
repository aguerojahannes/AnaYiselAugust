angular.module('app.controllers', [])

.controller('DashCtrl', function($scope,$stateParams,GlobalFactory) {

  var vm = this;

})

.controller('ProfileCtrl', function($scope,$stateParams,GlobalFactory) {

  var vm = this;
    vm.profile = {};
    vm.status = GlobalFactory.status;


    // vm.displayProfile = function(){
    //  GlobalFactory.getUser($stateParams.id).then(function(res){
    //    vm.profile = res.data;
    //    console.log(vm.profile);
    //  });
    // };

    function displayProfile(){
      GlobalFactory.getUser($stateParams.id).then(function(res){
        vm.profile = res.data;
        console.log(vm.profile);
      });
    };
    displayProfile();


    vm.updateProfile = function(){
      GlobalFactory.updateUser($stateParams.id, vm.profile).then(function(res){
        vm.profile = res.data; // need this?
        $state.go("Profile", {id: vm.status._id});
      });
    };

})





.controller('ContactsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('RequestsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
