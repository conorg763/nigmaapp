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