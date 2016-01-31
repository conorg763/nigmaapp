app.controller('addEventCtrl',[
    '$scope',
    '$state',
    'events',
    'auth',
    'toastr',
    function($scope,$state,events,auth,toastr) {
        $scope.addEvent = function(){
            events.create($scope.event)
                .then(function(event) {
                    toastr.success('You have successfully added this Event!','Woohooo!' );
                    $state.go('community');
                })
                .catch(function(err) {
                    console.log(err);
                    toastr.error('Something seemed to have went wrong.. Please Try again.','Oops!' );

                });
        };
    }
]);
