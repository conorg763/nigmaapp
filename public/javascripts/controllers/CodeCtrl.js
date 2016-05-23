app.controller('CodeCtrl',[
    '$scope',
    'posts',
    'auth',
    function($scope,posts,auth) {
        $scope.posts = posts.posts;
        $scope.isLoggedIn = auth.isLoggedIn;   //check
        //prevents empty posts
        $scope.title = '';

        $scope.addPost = function () {
            if ($scope.title === '') {
                return;
            }
            posts.create({
                title: $scope.title,
                link: $scope.link,
                categories: $scope.categories
            });
            //clears values
            $scope.title = '';
            $scope.link = '';
            $scope.categories=[];
        };
        //post factory has an upvote() function in it, we are just calling using this post
        $scope.incrementUpvotes = function (post) {
            posts.upvote(post);
        }


        $scope.filterByCategory = function(post) {
            if($scope.category === undefined) {
                return true;
            }
            return post.categories.indexOf($scope.category) !== -1;
        }

        $scope.setFilterCategory = function(category) {
            $scope.category = category;
        }

        $scope.unsetFilterCategory = function() {
            $scope.category = undefined;
        }


    }
]);