var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var VenmoStrategy = require('passport-venmo').Strategy;
var User = require('./models/user');

var routes = require('./routes/index');
var users = require('./routes/users');
var surveys = require('./routes/surveys');
var auth = require('./routes/auth');

var mongoose = require('mongoose');
var db = mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/surveymo');
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
app.use(express.session({ secret: process.env.SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/surveys', surveys);
app.use('/auth', auth);

// Passport config

var fs = require('fs');
if (app.get('env') === 'development' && fs.existsSync(__dirname + "/.env")) {
  env = require('node-env-file');
  env(__dirname + '/.env');
}

var configurePassportWithVenmo = function(configuration) {
  passport.use(new VenmoStrategy(configuration.venmo,
  function(accessToken, refreshToken, profile, done) {
    User.findOne({
      username: profile.username,
    }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        user = new User({
          displayName: profile.displayName,
          username: profile.username,
          email: profile.email,
          accessToken: accessToken,
          refreshToken: refreshToken
        });
        user.save(function(err) {
          if (err) {
            res.status(err.status || 500);
            res.render('error', {
              message: err.message,
              error: err
            });
          }
          return done(err, user);
        });
      } else {
        user.accessToken = accessToken;
        user.save();
        return done(err, user);
      }
    });
  }))
};

var configuration = {
  venmo: {
    clientID: process.env.VENMO_CLIENT_ID,
    clientSecret: process.env.VENMO_CLIENT_SECRET,
    callbackURL: "http://surveymo.heroku.com/auth/venmo/callback"
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

db.connection.on('error', function(err) {
      console.log("DB connection Error: "+err);
});
db.connection.on('open', function() {
      console.log("DB connected");
});
db.connection.on('close', function(str) {
      console.log("DB disconnected: "+str);
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Express server listening on port ' + server.address().port);
});
