var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var Job = mongoose.model('Job');
var Event = mongoose.model('Event');

var auth = jwt({secret: 'SECRET',userProperty:'payload'}); //remember to change token to variable instead of hard coding

//get homepage
router.get('/',function(req,res) {
  res.render('index');
});

//get posts for Code Page
router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
  });
});

//get events for Community Page
router.get('/events',function(req,res,next) {
  Event.find(function (err,events) {
    if(err){ return next(err); }
    res.json(events);
  })
});

router.post('/events',function(req,res,next) {
  var event = new Event(req.body);
  event.save(function(err,event) {
    if(err) { return next(err); }
    res.json(event);
  })
});

router.post('/events/query',function(req,res,next) {
  var query = req.body;
  Event.find(query,function(err,events) {
    if(err){ return next(err); }
    res.json(events);
  })
});


router.put('/editEvent/:id',function (req,res,next) {
  var event =  req.body;
  var id = req.params.id;
  Event.findOneAndUpdate({_id: id},event,function(err,event) {
    if(err) {return next(err);}
    res.json(event);
  })
});

//get jobs for Career Page
router.get('/jobs',function(req,res,next) {
  Job.find(function (err,jobs) {
    if(err){ return next(err); }
    res.json(jobs);
  })

});

//add job
router.post('/jobs',function(req,res,next) {
  var job = new Job(req.body);
  job.save(function(err,job) {
    if(err){ return next(err); }
    res.json(job);
  })
});

router.post('/jobs/query',function(req,res,next) {
  var query = req.body;
  Job.find(query,function(err,jobs) {
    if(err){ return next(err); }
    res.json(jobs);
  })
});


router.put('/editJob/:id',function (req,res,next) {
  var job =  req.body;
  var id = req.params.id;
  Job.findOneAndUpdate({_id: id},job,function(err,job) {
    if(err) {return next(err);}
    res.json(job);
  })
});

router.delete('/editJob/:id', function(req,res,next) {
  var id = req.params.id;
  Job.remove({_id: id},function(err,job) {
    if(err) {return next(err);}
  })

})
//create new post
router.post('/posts',auth, function(req, res, next) {
  var post = new Post(req.body);
  post.author = req.payload.username;
  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error("can't find post")); }

    req.post = post;
    return next();
  });
});

//preload comment objects on routes with ':comment'
router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }

    req.comment = comment;
    return next();
  });
});

router.get('/posts/:post', function(req, res) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }
    res.json(post);
  });
});

//upvote
router.put('/posts/:post/upvote',auth,function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

//commenting
router.post('/posts/:post/comments',auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;
  comment.author = req.payload.username;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

//upvote a comment
router.put('/posts/:post/comments/:comment/upvote',auth,function(req,res,next) {
  req.comment.upvote(function (err,comment) {
    if (err) {return next(err);}
    res.json(comment);
  })
});

//adding register route that creates username and password
router.post('/register',function(req,res,next) {
  if(!req.body.firstName || !req.body.surname || !req.body.email || !req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'})
  }

  var user = new User();
  user.firstName = req.body.firstName;
  user.surname = req.body.surname;
  user.email = req.body.email;
  user.username = req.body.username;
  user.setPassword(req.body.password);

  user.save(function (err) {
    if(err){return next(err);}
    return res.json({token: user.generateJWT()})
  });
});

router.post('/login',function(req,res,next) {
  if(!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all the fields'});
  }

  console.log('calling passport');
  passport.authenticate('local',function(err,user,info) {
    if(err) {return next(err);}
    if(user) {
      return res.json({token:user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req,res,next);
});




module.exports = router;
