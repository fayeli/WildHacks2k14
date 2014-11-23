var express = require('express');
var router = express.Router();
var Survey = require('../models/survey');
var uuid = require('node-uuid');

/* GET surveys listing. */
router.get('/', function(req, res) {
  Survey.find({}, function(err, surveys) {
    if (err) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    } else {
      res.render('surveys', { surveys: surveys, displayName: (req.user || {}).displayName });
    }
  })
});

/* POST create new survey */
router.post('/', function(req, res) {
  var choices = [];
  if (req.body.firstChoice !== '') choices.push(req.body.firstChoice);
  if (req.body.secondChoice !== '') choices.push(req.body.secondChoice);
  if (req.body.thirdChoice !== '') choices.push(req.body.thirdChoice);
  if (req.body.fourthChoice !== '') choices.push(req.body.fourthChoice);
  var survey = new Survey({
    question: req.body.question,
    choices: choices,
    owner: req.user.username,
    id: uuid.v1()
  });

  survey.save(function (err) {
    if (err) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    } else {
      Survey.find({}, function(err, surveys) {
        if (err) {
          res.status(err.status || 500);
          res.render('error', {
            message: err.message,
            error: err
          });
        } else {
          res.render('surveys', { surveys: surveys, displayName: (req.user || {}).displayName });
        }
      });
    }
  });
});

/* GET new surveys form. */
router.get('/new', function(req, res) {
  res.render('surveys/new', { title: 'New Survey', displayName: (req.user || {}).displayName });
});

router.get('/settings', function(req, res) {
  res.render('surveys/settings', { title: 'Survey Settings', displayName: (req.user || {}).displayName });
});

module.exports = router;
