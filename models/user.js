var mongoose = require('mongoose');
var primitives = require('./primitives')

var User = mongoose.model('User', mongoose.Schema({
  displayName: String,
  username: String,
  email: String,
  accessToken: String,
  refreshToken: String,
  venmoCreds: {},
  ageRange: primitives.AgeRange,
  gender: primitives.Gender
  // location: primitives.Location
}));

module.exports = User;
