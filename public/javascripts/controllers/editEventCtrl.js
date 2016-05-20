
app.controller('editEventCtrl',[
    '$scope',
    'events',
    'auth',
    '$stateParams',
    'toastr',
    '$state',
    function($scope,events,auth,$stateParams,toastr,$state) {

        var query = {_id: $stateParams.id};
        events.find(query)
            .then(function (event) {
                $scope.event = event;
            })

            .catch(function (err) {
                console.log(err);
            });

        $scope.updateEvent = function(event) {
            events.update(event)
                .then(function (event) {
                    toastr.success('You have successfully updated this Event!','Woohooo!' );
                    $state.go('community');
                })
                .catch(function (err) {
                    toastr.error('Something seemed to have went wrong.. Please Try again.','Oops!' );
                });
        };

        $scope.removeEvent = function(event) {
            bootbox.confirm("Are you sure you want to delete this Event?",function(answer) {
                if (answer == true) {
                    events.remove(event)
                        .then(function () {
                            toastr.success('You have successfully removed this Event!', 'Woohooo!');
                            $state.go('community');

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
