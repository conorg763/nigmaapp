//var Twit = require('twit');
//var T = new Twit({
//
//    consumer_key: '5D4vVnQd2XkghydvNFnj3uuaK',
//    consumer_secret:      'EI2OIeD5lzUFaIfpoPXLHeQ7KhAUcuas6cklUvUTk9ZRhE8p6e',
//    access_token:         '3404042547-Qagc829o0rJlkgmvXR4KBXZSvb68kBsd7dVORjW',
//    access_token_secret:  'KLFd5zKtml8BoesUpTYZBiNJMPnl72YiRgsgAQP9iitXI'
//
//});
//
//var stream = T.stream('statuses/sample',{track:'kim'});
//
//stream.on('connect', function(request) {
//    console.log("Connected to Twitter API");
//    console.log(request)
//});
//
//stream.on('disconnect', function(message) {
//    console.log("Disconnected frin Twitter API " + message);
//    console.log(request)
//});
//
//stream.on('tweet',function(tweet) {
//    console.log(tweet);
//});