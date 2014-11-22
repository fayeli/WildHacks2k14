var mongoose = require('mongoose');
var primitives = require('./models/primitives')

var Kitten = mongoose.model('User', mongoose.Schema({
  username: String,
  venmoCreds: {},
  ageRange: primitives.AgeRange,
  gender: primitives.Gender,
  location: primitives.Location
}))

{
    surveySchema: {
        id: Integer,
        owner: String,
        question: String,
        choices: [String]
    },
    responseSchema: {
        id: Integer,
        surveyId: Integer,
        responder: String,
        responseIndex: Integer
    }
}
