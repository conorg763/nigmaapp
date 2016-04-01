var request = require('request');
var twitter = require('twitter');

module.exports = function(io){
    io.on('connection',function(socket) {
        var client = new twitter({
            consumer_key: '5D4vVnQd2XkghydvNFnj3uuaK',
            consumer_secret: 'EI2OIeD5lzUFaIfpoPXLHeQ7KhAUcuas6cklUvUTk9ZRhE8p6e',
            access_token_key: '3404042547-Qagc829o0rJlkgmvXR4KBXZSvb68kBsd7dVORjW',
            access_token_secret: 'KLFd5zKtml8BoesUpTYZBiNJMPnl72YiRgsgAQP9iitXI'
        });

        client.stream('statuses/filter',{track: 'Kim'}, function(stream) {
            stream.on('data',function(tweet) {
                io.emit('newTweet', tweet);
            });
            stream.on('error',function(error) {
                throw error;
            });
        });

        var username = '';
        console.log("A user has connected");

        socket.on('request-users',function() {
            socket.emit('users',{users: users});
        });

        socket.on('message',function(data) {
            io.emit('message',{username:username, message: data.message});
        });

        socket.on('add-user',function(data) {
            if(users.indexOf(data.username) == -1) {
                io.emit('add-user', {
                    username: data.username
                });
                username = data.username;
                users.push(data.username);
            }
            else {
                socket.emit('prompt-username', {
                    message: 'User Already Exists'
                })
            }
        });


        socket.on('disconnect',function() {
            console.log(username + " has disconnected");
            users.splice(users.indexOf(username),1);
            io.emit('remove-user',{username: username});
        })
    });
}

