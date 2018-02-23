// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Define our user schema
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Execute before each user.save() call
UserSchema.pre('save', function(next) {
  var user = this;
  console.log("In user pre save----------------")
  console.log(user);
  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;
  console.log("User after hash----------------")
  next();
  /*

  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hashAsyc(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });*/
});

UserSchema.methods.verifyPassword = function(password, cb) {
  console.log("In password compare")
  var isMatch = bcrypt.compareSync(password, this.password)
  console.log(password);
  console.log(this.password);
  console.log(isMatch);
  return isMatch;
};

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);