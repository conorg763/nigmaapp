
app.controller('editProjectCtrl',[
    '$scope',
    'projects',
    'auth',
    '$stateParams',
    'toastr',
    '$state',
    function($scope,projects,auth,$stateParams,toastr,$state) {

        var query = {_id: $stateParams.id};
        projects.find(query)
            .then(function (project) {
                $scope.project = project;
            })

            .catch(function (err) {
                console.log(err);
            });

        $scope.updateProject = function(project) {
            projects.update(project)
                .then(function (project) {
                    toastr.success('You have successfully updated this Project!','Woohooo!' );
                    $state.go('projects');
                })
                .catch(function (err) {
                    console.log(err);
                    toastr.error('Something seemed to have went wrong.. Please Try again.','Oops!' );
                });
        };

        $scope.removeProject = function(project) {
            bootbox.confirm("Are you sure you want to delete this Project?",function(answer) {
                if (answer == true) {
                    projects.remove(project)
                        .then(function () {
                            toastr.success('You have successfully removed this Project!', 'Woohooo!');
                            $state.go('projects');


                        })
                        .catch(function (err) {
                            console.log(err);
                            toastr.error('Something seemed to have went wrong.. Please Try again.', 'Oops!');
                        })
                }
            })

        };
    }
]);
