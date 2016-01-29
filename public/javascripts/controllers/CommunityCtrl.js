app.controller('CommunityCtrl',[
    '$scope',
    'auth',
    'Socket',
    function($scope,auth,Socket) {
        Socket.connect();

        $scope.$on('$locationChangestart', function(event) {
            Socket.disconnect(true);
        })

    }
]);