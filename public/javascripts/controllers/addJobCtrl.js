
app.controller('addJobCtrl',[
    '$scope',
    '$state',
    'jobs',
    'auth',
    'toastr',
    function($scope,$state,jobs,auth,toastr) {
        $scope.addJob = function(){
            jobs.create($scope.job)
                .then(function(job) {
                    toastr.success('You have successfully added this Job!','Woohooo!' );
                    $state.go('career');
                })
                .catch(function(err) {
                    console.log(err);
                    toastr.error('Something seemed to have went wrong.. Please Try again.','Oops!' );

                });
        };
    }
]);