app.controller('addProjectCtrl',[
    '$scope',
    '$state',
    'projects',
    'auth',
    'toastr',
    function($scope,$state,projects,auth,toastr) {
        $scope.addProject = function(){
            projects.create($scope.project)
                .then(function(project) {
                    toastr.success('You have successfully added this Project!','Woohooo!' );
                    $state.go('projects');
                })
                .catch(function(err) {
                    console.log(err);
                    toastr.error('Something seemed to have went wrong.. Please Try again.','Oops!' );

                });
        };
    }
]);

