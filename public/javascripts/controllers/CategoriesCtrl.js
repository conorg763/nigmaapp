app.factory('categories', ['$http','auth','$state',function($http,auth,$state){
    var categories = {
        categories: []
    };

    categories.getAll = function() {
        return $http.get('/categories').then(function(data) {
            angular.copy(data,categories.categories);
        })
    }

    categories.get = function(id) {
        //use the express route to grab post and return res
        return $http.get('/categories/' + id).then(function(res) {
            return res.data;
        })
    }


}]);

    app.controller('CategoriesCtrl',[
        '$scope',
        'categories',
        'auth',
        function($scope,categories,auth) {
            categories.getAll()
                .then(function(categoryData) {
                    $scope.isLoggedIn = auth.isLoggedIn;   //check
                    $scope.categories = categoryData.data;
                });

        }
    ]);