var path = require('path');

var body_parser = require('body-parser');
var express = require('express');
var express_session = require('express-session');
var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// body-parser setup
app.use(body_parser.urlencoded ({
	
	extended : false
}));

// session setup
app.use(express_session({ 

	name : 'session_id',
	saveUninitialized  : false,
	secret : 'keyboard cat',
	resave : false,
}));

// router setup
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// a. development error handler - will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// b. production error handler - no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;