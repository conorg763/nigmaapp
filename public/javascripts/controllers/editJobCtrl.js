
app.controller('editJobCtrl',[
    '$scope',
    'jobs',
    'auth',
    '$stateParams',
    'toastr',
    '$state',
    function($scope,jobs,auth,$stateParams,toastr,$state) {

            var query = {_id: $stateParams.id};
            jobs.find(query)
                .then(function (job) {
                    $scope.job = job;
                })

                .catch(function (err) {
                    console.log(err);
                });

        $scope.updateJob = function(job) {
            jobs.update(job)
            .then(function (job) {
                    toastr.success('You have successfully updated this Job!','Woohooo!' );
                    $state.go('career');
            })
                .catch(function (err) {
                    console.log(err);
                    toastr.error('Something seemed to have went wrong.. Please Try again.','Oops!' );
                });
        };

        $scope.removeJob = function(job) {
            jobs.remove(job)
                .then (function () {
                $state.go('home');
                toastr.success('You have successfully removed this Job!','Woohooo!');

            })
                .catch(function (err) {
                    console.log(err);
                    toastr.error('Something seemed to have went wrong.. Please Try again.','Oops!' );
                })
        };
    }
]);
