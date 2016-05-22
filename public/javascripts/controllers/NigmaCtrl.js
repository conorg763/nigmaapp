app.controller('NigmaCtrl',[
    '$scope',
    'Socket',
    'auth',
    function($scope,Socket,auth) {
        $scope.tweets = [];
        Socket.on('newTweet',function(tweet) {

            $scope.tweets.push(tweet);

            $scope.status = 'Amount of Tweets Retrieved: ' + $scope.tweets.length;

        });
    }
]);

