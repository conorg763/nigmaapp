app.factory('Socket', ['$http','auth','socketFactory',function($http,auth,socketFactory) {
return socketFactory();
}]);
