var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var azure = require('azure');
var VenmoStrategy = require('passport-venmo').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var surveys = require('./routes/surveys');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/surveys', surveys);

// Configure Passport

var venmoScopes = [
  "make_payments",
  "access_friends",
  "access_profile",
  "access_email"
];
app.get('/auth/venmo', passport.authenticate('venmo', { scope: venmoScopes }));

app.get('/auth/venmo/callback', passport.authenticate('venmo', { scope: venmoScopes, failureRedirect: '/' }), function(req, res) {
  res.redirect('/');
});

var configurePassportWithVenmo = function(configuration) {
  passport.use(new VenmoStrategy({
    clientID: configuration.venmo.clientId,
    clientSecret: configuration.venmo.clientSecret,
    callbackURL: configuration.venmo.webRedirectURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ VenmoId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }))
};

var configuration = {
  venmo: {
    clientId: process.env.VENMO_CLIENT_ID,
    clientSecret: process.env.VENMO_CLIENT_SECRET,
    webRedirectURL: "http://surveymo.azurewebsites.net/auth/venmo/callback"
  }
};

configurePassportWithVenmo(configuration);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

var server = app.listen(process.env.port || 3000, function() {
  console.log('Express server listening on port ' + server.address().port);
});
