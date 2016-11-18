
/**
 * Module dependencies
 */
config = require('./services/config');

var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    morgan = require('morgan'),
    session = require('express-session'),

  partials = require('./routes/partials'),
  profile = require('./routes/profile'),
  security=require('./routes/security'),
  http = require('http'),
  path = require('path');

var cookieParser = require('cookie-parser');
var HashStrategy = require('passport-hash').Strategy;
var request = require('request');

var passport = require('passport');
var permission = require('permission');
var app = module.exports = express();

/**
 * Configuration
 */

app.enable('trust proxy');
app.set('port', process.env.PORT || 5000 /*config.port*/);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());
app.use(cookieParser('farmared_app_secret'));
app.use(session({
  secret: 'farmared_app_secret',
  name: 'cookie_pharmared_landing',
  resave: true,
  rolling: true,
  saveUninitialized: true,
  cookie: {maxAge: config.session_expire, secure: false}}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new HashStrategy(function(token, done) {
  console.log('Try to authenticate: bearer token: ' + token);
  request(config.user_url + '?accessToken=' + token, function (error, res, body) {
    if (error) {
      console.log('Authentication with bearer fail with error: ' + error);
      return done(error);
    }
    console.log('Status code: ' + res.statusCode);
    if (res.statusCode != 200) {
      return done(null, false);
    }
    console.log('Response body: ' + body);
    var user = JSON.parse(body);
    user.accessToken = token;
    console.log('All are ok, authenticated');
    return done(null, user);
  });
}));


passport.serializeUser(function(user, done) {
  console.log("Serializing user: " + JSON.stringify(user));
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function(jsonUser, done) {
  console.log("Deserielizing user: " + jsonUser);
  var sessionUser = JSON.parse(jsonUser);
  done(null, sessionUser);
});

var env = process.env.NODE_ENV || 'development';
var handleError = function(err, req, res, next) {
  next();
};

// development only
if (env === 'development') {
  app.use(handleError);
  app.use(errorHandler());
} else {
  app.use(handleError);
}

/**za d
 * Routes
 */
var index = function(req, res) {
  res.render('index');
};

app.get('/', ensureAuthenticated, index);

app.get('/authorization/:hash',
    passport.authenticate('hash', { failureRedirect: config.fail_authorisation_url, session: true }),
    function(req, res) {
      res.redirect('/');
    });
app.get('/partials/:view', partials.partials);
app.use('/profile/',profile);
app.use('/password',security);
/**
 * Start Server
 */

var server = http.createServer(app);
server.listen(app.get('port'), function () {

});

server.on('error', function(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect(config.fail_authorisation_url);
};
