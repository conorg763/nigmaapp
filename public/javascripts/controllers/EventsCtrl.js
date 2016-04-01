app.factory('events', ['$http','auth','$state',function($http,auth,$state){
    var events = {
        events: []
    };

    events.getAll = function() {
        return $http.get('/events').success(function(res) {
            return res.data;

        });
    };

    events.create = function(event) {
        return $http.post('/events',event).then(function(res){
            events.events.push(event);
            return event;

        });
    };

    events.find = function(query) {
        return $http.post('/events/query',query).then(function(res) {
            return res.data[0];
        })
    };

    events.update = function(event) {
        return $http.put('/editEvent/' + event._id,event).then(function(res) {
            return true;
        })
    };

    events.remove = function(event) {
        return $http.delete('/editEvent/' + event._id,event).then(function (res) {
            return true;
        })

    };


    return events;  //possibly remove
}]);

app.controller('EventsCtrl',[
    '$scope',
    'events',
    'auth',
    function($scope,events,auth) {
        events.getAll()
            .then(function(eventData) {
                $scope.isLoggedIn = auth.isLoggedIn;   //check

                $scope.events = eventData.data;
            });

    }
]);
