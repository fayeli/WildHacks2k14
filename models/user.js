var mongoose = require('mongoose');
var primitives = require('./models/primitives')

var User = mongoose.model('User', mongoose.Schema({
  displayName: String,
  username: String,
  email: String,
  accessToken: String,
  refreshToken: String,
  venmoCreds: {},
  ageRange: primitives.AgeRange,
  gender: primitives.Gender,
  location: primitives.Location
}));

exports = User;

// {
//   surveySchema: {
//     id: Integer,
//     owner: String,
//     question: String,
//     choices: [String]
//   },
//   responseSchema: {
//     id: Integer,
//     surveyId: Integer,
//     responder: String,
//     responseIndex: Integer
//   }
// }
