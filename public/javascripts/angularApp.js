var app = angular.module('nigma', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['posts', function(posts){
                        return posts.getAll();
                    }]
                }
            })

            .state('posts', {
                url: '/posts/:id',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl',
                resolve: {
                    post: ['$stateParams', 'posts', function($stateParams, posts) {
                        return posts.get($stateParams.id);
                    }]
                }
            })

            .state('login', {
                url: '/login',
                templateUrl: '/login.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(auth.isLoggedIn()){
                        $state.go('home');
                    }
                }]
            })

            .state('register', {
                url: '/register',
                templateUrl: '/register.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', 'auth', function($state, auth){
                    if(auth.isLoggedIn()){
                        $state.go('home');
                    }
                }]
            })

            .state('connect', {
                url: '/connect',
                templateUrl: '/connect.html',
                controller: 'ConnectCtrl',
                onEnter: ['$state','auth',function($state,auth) {
                    if(auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })

            .state('code', {
                url: '/code',
                templateUrl: '/code.html',
                controller: 'CodeCtrl',
                onEnter: ['$state','auth',function($state,auth) {
                    if(auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })

            .state('career', {
                url: '/career',
                templateUrl: '/career.html',
                controller: 'CareerCtrl',
                onEnter: ['$state','auth','$http',function($state,auth,$http) {
                    if(auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })

            .state('community', {
                url: '/community',
                templateUrl: '/community.html',
                controller: 'CommunityCtrl',
                onEnter: ['$state','auth',function($state,auth) {
                    if(auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            });

        $urlRouterProvider.otherwise('home');
    }]);

app.factory('auth',['$http','$window',function($http,$window) {
    var auth = {};
    auth.saveToken = function(token) {
        $window.localStorage['nigma-token'] = token;
    };

    auth.getToken = function() {
        return $window.localStorage['nigma-token'];
    }
    auth.isLoggedIn = function() {
        var token = auth.getToken();
        if(token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    auth.currentUser = function() {
        if(auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.username;
        }
    }

    auth.register = function(user) {
        return $http.post('/register',user).success(function(data) {
            auth.saveToken(data.token);
        });
    };

    auth.logIn = function(user) {
        return $http.post('/login',user).success(function(data) {
            auth.saveToken(data.token);
        });
    };

    auth.logOut = function() {
        $window.localStorage.removeItem('nigma-token');
    };
    return auth;
}]);

app.factory('posts', ['$http','auth',function($http,auth){
    var o = {
        posts: []
    };

    o.getAll = function() {
        return $http.get('/posts').success(function(data) {
            angular.copy(data, o.posts);
        });
    };
    // we create new posts
    //uses the router.post in index.js to post  new post mongoose model to mongodb
    //when $http gets a success back, it adds this post to the posts object in
    //this local factory, so the mongodb and angular data is the same

    o.create = function(post) {
        return $http.post('/posts', post, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data){
            o.posts.push(data);
        });
    };
    o.upvote = function(post) {
        return $http.put('/posts/' + post._id + '/upvote',null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data) {
                post.upvotes +=1;
        });
    };

    // this grabs a single post from the server
    o.get = function(id) {
        //use the express route to grab post and return res
        return $http.get('/posts/' + id).then(function(res) {
            return res.data;
        })
    }
    //comments grabbed
    o.addComment = function(id, comment) {
        return $http.post('/posts/' + id + '/comments', comment, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
    };
    o.upvoteComment = function(post, comment) {
        return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote',null, {
            headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data){
                comment.upvotes += 1;
            });
    };
    return o;  //possibly remove
}]);


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

app.controller('PostsCtrl', [
    '$scope',
    'posts',
    'post',
    'auth',
    function($scope, posts, post,auth){
        $scope.post = post;
        $scope.isLoggedIn = auth.isLoggedIn;   //check

        $scope.addComment = function(){
            if($scope.body === '') { return; }
            posts.addComment(post._id,{
                body: $scope.body,
                author: 'user',
            }).success(function(comment) {
                $scope.post.comments.push(comment);
            });
            $scope.body = '';
        };
        $scope.incrementUpvotes = function(comment) {
            posts.upvoteComment(post,comment);
        }

    }
]);


app.controller('AuthCtrl', [
    '$scope',
    '$state',
    'auth',
    function($scope, $state, auth){
        $scope.user = {};

        $scope.register = function() {
            auth.register($scope.user).error(function(error){
                $scope.error = error;
            }).then(function(){
                $state.go('home');
            });
        };

        $scope.logIn = function() {
            auth.logIn($scope.user).error(function(error){
                $scope.error = error;
            }).then(function(){
                $state.go('home');
            });
        };
    }
]);



app.controller('NavCtrl', [
        '$scope',
        'auth',
        function($scope, auth) {
            $scope.isLoggedIn = auth.isLoggedIn;
            $scope.currentUser = auth.currentUser;
            $scope.logOut = auth.logOut;
        }]);

app.controller('ConnectCtrl',[
    '$scope',
    'auth',
    function($scope,auth) {

    }
]);

app.controller('CodeCtrl',[
    '$scope',
    'auth',
    function($scope,auth) {

    }
]);

app.controller('CareerCtrl',[
    '$scope',
    'auth',
    '$http',
    function($scope,auth,$http) {
        console.log("Hello from controller");

            $http.get('/jobs').success(function(response) {
                console.log("I got data I requested");
                $scope.jobs = response;
                $scope.job = "";
            });

        $scope.addJob = function() {
            console.log($scope.job);
            $http.post('/jobs',$scope.job).success(function(response) {
                $scope.jobs.push(response);
            });
        };


    }
]);

app.controller('CommunityCtrl',[
    '$scope',
    'auth',
    function($scope,auth) {

    }
]);