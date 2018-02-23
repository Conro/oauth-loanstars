// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  /*
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  console.log(user);
  user.save(function(err) {
    console.log("in user.save: " + user);
    if (err){
      console
      return res.send(err);
    }
      

    res.json({ message: 'New beer drinker added to the locker room!' });
  });*/



  const obj = new User(req.body);
    obj.save((err, item) => {
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.send(400);
      }
      if (err) {
        return console.error(err);
      }
      res.json({ message: 'New beer drinker added to the locker room!' });
    });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      return res.send(err);

    res.json(users);
  });
};