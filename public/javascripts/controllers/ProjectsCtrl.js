app.factory('projects', ['$http','auth','$state',function($http,auth,$state){
    var projects = {
        projects: []
    };

    projects.getAll = function() {
        return $http.get('/projects').success(function(res) {
            return res.data;

        });
    };

    projects.create = function(project) {
        return $http.post('/projects',project).then(function(res){
            projects.projects.push(project);
            return project;

        });
    };

    projects.find = function(query) {
        return $http.post('/projects/query',query).then(function(res) {
            return res.data[0];
        })
    };

    projects.update = function(project) {
        return $http.put('/editProject/' + project._id,project).then(function(res) {
            return true;
        })
    };

    projects.remove = function(project) {
        return $http.delete('/editProject/' + project._id,project).then(function (res) {
            return true;
        })
    };

    return projects;  //possibly remove
}]);

app.controller('ProjectsCtrl',[
    '$scope',
    'projects',
    'auth',
    function($scope,projects,auth) {
        projects.getAll()
            .then(function(projectData) {
                $scope.isLoggedIn = auth.isLoggedIn;   //check
                $scope.projects = projectData.data;
            });

    }
]);
