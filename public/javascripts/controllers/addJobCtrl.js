
app.controller('addJobCtrl',[
    '$scope',
    '$state',
    'jobs',
    'auth',
    function($scope,$state,jobs,auth) {
        $scope.addJob = function(){
            jobs.create($scope.job)
                .then(function(job) {
                    $state.go('career');
                })
                .catch(function(err) {
                    console.log(err);
                });
        };
    }
]);