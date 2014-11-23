var mongoose = require('mongoose');

var primitives = {};

primitives.AgeRange = {
  enum: [
    "13 - 18",
    "19 - 22",
    "23 - 29",
    "30 - 35",
    "36 - 39",
    "40 - 45",
    "46 - 49",
    "+50"
  ]
};

primitives.Gender = {
  enum: [
    "Female",
    "Male",
    "Other"
  ]
}

exports = primitives;
