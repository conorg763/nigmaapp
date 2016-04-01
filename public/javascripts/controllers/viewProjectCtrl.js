app.controller('viewProjectCtrl',[
    '$scope',
    'projects',
    'auth',
    '$stateParams',
    function($scope,projects,auth,$stateParams) {
        var query = {_id: $stateParams.id};
        projects.find(query)
            .then(function(project) {
                $scope.project = project;

            });

    }
]);