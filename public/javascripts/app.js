var app = angular.module('nigma', ['ui.router', 'toastr', 'btford.socket-io']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',


    function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            })

            .state('categories', {
                url: '/categories/:id',
                templateUrl: '/categories.html',
                controller: 'CategoriesCtrl',
                resolve: {
                    category: ['$stateParams', 'categories', function ($stateParams, categories) {
                        return categories.get($stateParams.id);
                    }]
                }
            })


            .state('posts', {
                url: '/posts/:id',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl',
                resolve: {
                    post: ['$stateParams', 'posts', function ($stateParams, posts) {
                        return posts.get($stateParams.id);
                    }]
                }
            })

            .state('login', {
                url: '/login',
                templateUrl: '/login.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', 'auth', function ($state, auth) {
                    if (auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })

            .state('register', {
                url: '/register',
                templateUrl: '/register.html',
                controller: 'AuthCtrl',
                onEnter: ['$state', 'auth', function ($state, auth) {
                    if (auth.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })

            .state('connect', {
                url: '/connect',
                templateUrl: '/connect.html',
                controller: 'ConnectCtrl',
                //onEnter: ['$state', 'auth', function ($state, auth) {
                //    if (auth.logOut) {
                //        $state.go('home');
                //    }
                //}]
            })

            .state('code', {
                url: '/code',
                templateUrl: '/code.html',
                controller: 'CodeCtrl',
                //onEnter: ['$state','auth',function($state,auth) {
                //    if(auth.isLoggedIn()) {
                //        $state.go('home');
                //    }
                //}]
                resolve: {
                    postPromise: ['posts', function (posts) {
                        return posts.getAll();
                    }]
                }
            })

            .state('career', {
                url: '/career',
                templateUrl: '/career.html',
                controller: 'JobsCtrl'
                //onEnter: ['$state','auth','$http',function($state,auth,$http) {
                //    if(auth.isLoggedIn()) {
                //        $state.go('home');
                //    }
                //}]
            })

            .state('community', {
                url: '/community',
                templateUrl: '/community.html',
                controller: 'EventsCtrl'
                //onEnter: ['$state','auth',function($state,auth) {
                //    if(auth.isLoggedIn()) {
                //        $state.go('home');
                //    }
                //}]
            })

            .state('projects', {
                url: '/projects',
                templateUrl: '/projects.html',
                controller: 'ProjectsCtrl'
                //onEnter: ['$state','auth',function($state,auth) {
                //    if(auth.isLoggedIn()) {
                //        $state.go('home');
                //    }
                //}]
            })

            .state('viewJob', {
                url: '/viewJob/:id',
                templateUrl: '/viewJob.html',
                controller: 'viewJobCtrl'
                //onEnter: ['$state','auth',function($state,auth) {
                //    if(auth.isLoggedIn()) {
                //        $state.go('home');
                //    }
                //}]
            })

            .state('editJob', {
                url: '/editJob/:id',
                templateUrl: '/editJob.html',
                controller: 'editJobCtrl'
                //onEnter: ['$state','auth',function($state,auth) {
                //    if(auth.isLoggedIn()) {
                //        $state.go('home');
                //    }
                //}]
            })
            .state('addJob', {
                url: '/addJob',
                templateUrl: '/addJob.html',
                controller: 'addJobCtrl'
                //onEnter: ['$state','auth',function($state,auth) {
                //    if(auth.isLoggedIn()) {
                //        $state.go('home');
                //    }
                //}]
            })

            .state('addEvent', {
                url: '/addEvent',
                templateUrl: '/addEvent.html',
                controller: 'addEventCtrl'
                //onEnter: ['$state','auth',function($state,auth) {
                //    if(auth.isLoggedIn()) {
                //        $state.go('home');
                //    }
                //}]
            })
            .state('editEvent', {
                url: '/editEvent/:id',
                templateUrl: '/editEvent.html',
                controller: 'editEventCtrl'
                //onEnter: ['$state','auth',function($state,auth) {
                //    if(auth.isLoggedIn()) {
                //        $state.go('home');
                //    }
                //}]
            })

            .state('viewEvent', {
                url: '/viewEvent/:id',
                templateUrl: '/viewEvent.html',
                controller: 'viewEventCtrl'
                //onEnter: ['$state','auth',function($state,auth) {
                //    if(auth.isLoggedIn()) {
                //        $state.go('home');
                //    }
                //}]
            })

            .state('viewProject', {
                url: '/viewProject/:id',
                templateUrl: '/viewProject.html',
                controller: 'viewProjectCtrl'
                //onEnter: ['$state','auth',function($state,auth) {
                //    if(auth.isLoggedIn()) {
                //        $state.go('home');
                //    }
                //}]
            })

            .state('editProject', {
                url: '/editProject/:id',
                templateUrl: '/editProject.html',
                controller: 'editProjectCtrl'
                //onEnter: ['$state','auth',function($state,auth) {
                //    if(auth.isLoggedIn()) {
                //        $state.go('home');
                //    }
                //}]
            })
            .state('addProject', {
                url: '/addProject',
                templateUrl: '/addProject.html',
                controller: 'addProjectCtrl'
                //onEnter: ['$state','auth',function($state,auth) {
                //    if(auth.isLoggedIn()) {
                //        $state.go('home');
                //    }
                //}]
            })
            .state('editProfile', {
                url: '/editProfile',
                templateUrl: '/editProfile.html',
                controller: 'editProfileCtrl'
                //onEnter: ['$state','auth',function($state,auth) {
                //    if(auth.isLoggedIn()) {
                //        $state.go('home');
                //    }
                //}]
            })


        $urlRouterProvider.otherwise('home');
    }]);