app.factory('jobs', ['$http','auth',function($http,auth){
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

    jobs.get = function(id) {
        //use the express route to grab post and return res
        return $http.get('/jobs/' + id).then(function(res) {
            return res.data;
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
                $scope.jobs = jobData.data;
            });

        $scope.addJob = function(){
            jobs.create({
                jobTitle: $scope.jobTitle,
                company: $scope.company,
                location: $scope.location,
                jobType: $scope.jobType,
                jobDescription: $scope.jobType,
                salary: $scope.salary,
                apply: $scope.apply


            })
                .then(function(job) {
                    $scope.jobs.push(job)
                })
                .catch(function(err) {
                    console.log(err);
                });
            //clears values
            $scope.jobTitle = '';
            $scope.company = '';
            $scope.location = '';
            $scope.jobType = '';
            $scope.jobType = '';
            $scope.salary = '';
            $scope.apply = '';

        };


    }
]);