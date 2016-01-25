
app.controller('editJobCtrl',[
    '$scope',
    'jobs',
    'auth',
    '$stateParams',
    function($scope,jobs,auth,$stateParams) {

            var query = {_id: $stateParams.id};
            jobs.find(query)
                .then(function (job) {
                    $scope.job = job;
                })

                .catch(function (err) {
                    console.log(err);
                });

        $scope.updateJob = function(job) {
            jobs.update(job);
        }
    }
]);
