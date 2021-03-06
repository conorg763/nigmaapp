app.factory('jobs', ['$http','auth','$state',function($http,auth,$state){
    var jobs = {
        jobs: []
    };

    jobs.getAll = function() {
        return $http.get('/jobs').success(function(res) {
            return res.data;

        });
    };

    jobs.create = function(job) {
        return $http.post('/jobs',job).then(function(res){
            jobs.jobs.push(job);
            return job;

        });
    };

    jobs.find = function(query) {
        return $http.post('/jobs/query',query).then(function(res) {
                return res.data[0];
        })
    };

    jobs.update = function(job) {
        return $http.put('/editJob/' + job._id,job).then(function(res) {
            return true;
        })
    };

    jobs.remove = function(job) {
        return $http.delete('/editJob/' + job._id,job).then(function (res) {
            return true;
        })

    };


    return jobs;  //possibly remove
}]);

app.controller('JobsCtrl',[
    '$scope',
    'jobs',
    'auth',
    function($scope,jobs,auth) {
        jobs.getAll()
            .then(function(jobData) {
                $scope.isLoggedIn = auth.isLoggedIn;   //check
                $scope.jobs = jobData.data;
            });

    }
]);