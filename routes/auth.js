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
  res.redirect('/');
});

module.exports = router;
