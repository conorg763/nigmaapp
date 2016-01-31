
app.controller('viewEventCtrl',[
    '$scope',
    'events',
    'auth',
    '$stateParams',
    function($scope,events,auth,$stateParams) {
        var query = {_id: $stateParams.id};
        events.find(query)
            .then(function(event) {
                $scope.event = event;

            });

    }
]);

//