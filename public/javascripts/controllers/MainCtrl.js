app.factory('Socket', function($rootScope) {
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket,args);
                });
            });
        },
        emit: function (eventName,data,callback) {
            socket.emit(eventName,data,function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if(callback) {
                        callback.apply(socket,args);
                    }
                })
            })
        }
    }
})

app.controller('MainCtrl', [
    '$scope','Socket','auth','$http','$sce',
    function($scope,Socket,auth,$http,$sce ){
        $scope.tweets = [];
        var meetupKey = '5466443924e5a5d2d20417111623933';
        var googleKey = 'AIzaSyD-lu9UvVjk-OpVg6p12aEWixXX4HcWIYs';
        var groupName = 'nigmaio';
        var url = 'http://api.meetup.com/2/events.json?key=' + meetupKey + '&group_urlname='+ groupName + "&callback=JSON_CALLBACK";
       // var googleMap = "https://www.google.com/maps/embed/v1/place?q=" + postcode + "&key=" + googleKey;

        Socket.on('newTweet',function(tweet) {

            $scope.tweets.push(tweet);

            $scope.status = 'Amount of Tweets Retrieved: ' + $scope.tweets.length;

        });

        $scope.trustSrc = function(postcode) {
            return $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + postcode + "&key=" + googleKey);
        };

         $http.jsonp(url)
             .then(function(data) {
                console.log("success");
                $scope.events = data.data.results;
                 console.log($scope.events);
                 angular.forEach($scope.events,function(event) {
                     console.log(event.venue.city);
                     $scope.postcode = event.venue.city;

                 })

             })
            .catch(function(status) {
                console.log(status);
             })

    }]);
