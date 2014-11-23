var express = require('express');
var router = express.Router();

var passport = require('passport');

var venmoScopes = [
  "make_payments",
  "access_friends",
  "access_profile",
  "access_email"
];

var venmoOptions = { scope: venmoScopes, failureRedirect: '/' }
var passportMiddleware = passport.authenticate('venmo', venmoOptions);
router.get('/venmo', passportMiddleware);
router.get('/venmo/callback', passportMiddleware, function(req, res) {
  if (req.user.ageRange) {
    res.redirect('/');
  } else {
    res.redirect('/post-signup');
  }
});

router.get('/post-signup', function(req, res) {
  res.render('post_signup', {
    ageRanges: User.schema.path('ageRange').enumValues,
    genders: User.schema.path('gender').enumValues
  });
});

router.post('/post-signup', function(req, res) {
  var user = req.user;
  user.ageRange = req.body.ageRange;
  user.gender = req.body.gender;
  user.save(function(err) {
    if (err) {
      res.render('error', {
        message: err.message,
        error: err
      });
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
