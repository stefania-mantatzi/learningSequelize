var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// our ears - get the requests
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authController = require('./routes/auth');
var customersController = require('./routes/customers');

var app = express();

// view engine setup
// routers render dynammically the view that they define
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Model View Controller
// baseURL == http://localhost:4000
// these app.use define the endpoints == urls
// router === controller (MVC)
// indexRouter can have multiple urls with multiple methods
// GET /, POST /, PUT /, DELETE /, HEAD /, OPTIONS /, PATCH /, HEADERS /
app.use('/', indexRouter); // <-- this means that the indexRouter responds to http://localhost:4000/ 

// GET http://localhost:4000/users
app.use('/users', usersRouter); // userRouter responds to http://localhost:4000/users
app.use('/auth', authController); // authController responds to http://localhost:4000/auth/login
app.use('/customers', customersController);
// /koukou main url
// /users/list



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
