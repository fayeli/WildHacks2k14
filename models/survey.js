var mongoose = require('mongoose');

var Survey = mongoose.model('Survey', mongoose.Schema({
  id: String,
  owner: String,
  question: String,
  choices: [String]
}));

module.exports = Survey;
