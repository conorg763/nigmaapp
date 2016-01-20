app.controller('MainCtrl', [
    '$scope','posts','auth',
    function($scope,posts,auth){
        $scope.posts = posts.posts;
        $scope.isLoggedIn = auth.isLoggedIn;   //check
        //prevents empty posts
        $scope.title ='';

        $scope.addPost = function(){
            if($scope.title === '') { return; }
            posts.create({
                title: $scope.title,
                link: $scope.link,
            });
            //clears values
            $scope.title = '';
            $scope.link = '';
        };
        //post factory has an upvote() function in it, we are just calling using this post
        $scope.incrementUpvotes = function(post) {
            posts.upvote(post);
        };
    }]);
