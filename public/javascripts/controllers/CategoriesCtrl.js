app.factory('categories', ['$http','auth','$state',function($http,auth,$state){
    var categories = {
        categories: []
    };

    categories.getAll = function() {
        return $http.get('/categories').success(function(res) {
            return res.data;
        })
    }
    categories.category = function(post) {
        return $http.get('/code/' + post.categories,post).then(function(res) {
            return res.data;
        })
    };
    categories.get = function(id) {
        //use the express route to grab post and return res
        return $http.get('/code/' + id).then(function(res) {
            return res.data;
        })
    }


}]);

    app.controller('CategoriesCtrl',[
        '$scope',
        'categories',
        'category',
        'auth',
        function($scope,categories,category,auth) {
            categories.getAll().then(function(categoryData) {
                $scope.categories = categoryData.data;
                $scope.isLoggedIn = auth.isLoggedIn;
            })


        }
    ]);