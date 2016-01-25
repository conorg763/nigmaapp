
app.controller('viewJobCtrl',[
    '$scope',
    'jobs',
    'auth',
    '$stateParams',
    function($scope,jobs,auth,$stateParams) {
            var query = {_id: $stateParams.id};
            jobs.find(query)
                .then(function(job) {
                    $scope.job = job;

                });

    }
]);

//