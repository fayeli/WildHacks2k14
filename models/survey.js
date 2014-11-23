var mongoose = require('mongoose');

var Survey = mongoose.model('Survey', mongoose.Schema({
  id: Integer,
  owner: String,
  question: String,
  choices: [String],
  balance: Integer
}));

module.exports = Survey;
