var mongoose = require('mongoose');

var Response = mongoose.model('Response', mongoose.Schema({
  surveyId: Integer,
  responder: String,
  choice: String
}));

module.exports = User;
