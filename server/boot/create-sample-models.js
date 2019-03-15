'use strict';

var async = require('async');
module.exports = function(app) {
  //data sources
  var mongoDs = app.dataSources.mongoDs;
  //var mysqlDs = app.dataSources.mysqlDs;
  //create all models
  async.parallel({
    reviewers: async.apply(createReviewers),
    coffeeShops: async.apply(createCoffeeShops),
  }, function(err, results) {
    if (err) throw err;
    createReviews(results.reviewers, results.coffeeShops, function(err) {
      //console.log('> models created sucessfully');
    });
  });
  //create reviewers
  function createReviewers(cb) {
    mongoDs.automigrate('Reviewer', function(err) {
      if (err) return cb(err);
      var Reviewer = app.models.Reviewer;
      Reviewer.create([{
        email: 'foo@bar.com',
        password: 'foobar',
      }, {
        email: 'john@doe.com',
        password: 'johndoe',
      }, {
        email: 'jane@doe.com',
        password: 'janedoe',
      }], cb);
    });
  }
  //create coffee shops
  function createCoffeeShops(cb) {
    mongoDs.automigrate('CoffeeShop', function(err) {
      if (err) return cb(err);
      var CoffeeShop = app.models.CoffeeShop;
      CoffeeShop.create([{
        name: 'Bel Cafe',
        city: 'Vancouver',
      }, {
        name: 'Three Bees Coffee House',
        city: 'San Mateo',
      }, {
        name: 'Caffe Artigiano',
        city: 'Vancouver',
      }], cb);
    });
  }
  //create reviews
  function createReviews(reviewers, coffeeShops, cb) {
    mongoDs.automigrate('Review', function(err) {
      if (err) return cb(err);
      var Review = app.models.Review;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      Review.create([{
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        rating: 5,
        comments: 'A very good coffee shop.',
        publisherId: reviewers[0].id,
        coffeeShopId: coffeeShops[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 3),
        rating: 5,
        comments: 'Quite pleasant.',
        publisherId: reviewers[1].id,
        coffeeShopId: coffeeShops[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 2),
        rating: 4,
        comments: 'It was ok.',
        publisherId: reviewers[1].id,
        coffeeShopId: coffeeShops[1].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS),
        rating: 4,
        comments: 'I go here everyday.',
        publisherId: reviewers[2].id,
        coffeeShopId: coffeeShops[2].id,
      }], cb);
    });
  }

  //create admin user
  //IMPORTANT: you need to delete thinc user and admin role in order to rerun
  function createAdmin() {
    mongoDs.automigrate('User', function(err) {
      var User = app.models.User;
      var Role = app.models.Role;
      var RoleMapping = app.models.RoleMapping;
      User.findOrCreate(
        { username: 'thinc2', email: 'thinc2@cublood.org', password: 'thincandcublood', emailVerified: true, isAdmin: true, isApproved: true },
        function (err, user) {

          console.log(user.id);
          
          Role.findOrCreate({
            name: 'admin'
          }, function(err, role) {
            //if (err) return console.log(err);
            //console.log(role);
      
            // Make Bob an admin
            role.principals.create({
              principalType: RoleMapping.USER,
              principalId: user.id
            }, function(err, principal) {
              //if (err) return console.log(err);
              //console.log(principal);
            });
          });
        }
      );
    })
  }

  //IMPORTANT: you need to delete thinc user and admin role in order to rerun
  //createAdmin();

  console.log("Auto create initial data at server/boot/create-sample-models.js")
};
