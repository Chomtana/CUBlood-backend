const passport = require('passport');
const User = require('./models/User');
const router = require('express').Router();
const _ = require('lodash')

router.get('/', function(req, res) {
  res.render('index', {user: req.user});
  //res.send(req.user)
});

router.get('/register', function(req, res) {
  res.render('register', {});
});

router.post('/register', function(req, res, next) {
  console.log('registering user');
  
  let body = _.cloneDeep(req.body);
  delete body.password;
  
  User.register(new User(body), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
});

router.get('/login', function(req, res) {
  res.render('login', {user: req.user});
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  if (!req.user) {
    res.send("Username or password is incorrect")
  }
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/user', function(req, res) {
  res.send(req.user);
});

router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);  
  });
});

router.get('/users/:id', function(req,res) {
  User.findById(req.param("id"), function(err,user) {
    res.send(user);
  })
  //res.send(req.param("id"));
});

router.post('/users/:id/update', function(req,res) {
  let body = _.cloneDeep(req.body);
  delete body.password;
  delete body.username;
  
  User.findByIdAndUpdate(req.param("id"), body, function(err,data) {
    if (err) {
      console.log('error while update user!', err);
      return next(err);
    }
    
    res.send(data);  
  });
});



module.exports = router;