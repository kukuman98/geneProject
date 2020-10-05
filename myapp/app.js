var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var patientAPIRouter = require('./routes/patientAPI');
var loginAPIRouter = require('./routes/loginAPI');
var registerAPIRouter = require('./routes/registerAPI');
var memberAPIRouter = require('./routes/memberAPI');
var airtableAPIRouter= require('./routes/AirtableAPI');
var medicalHistoryAPIRouter = require('./routes/medicalHistoryAPI.js');

var app = express();

const expressJwt = require('express-jwt')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  debug:true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use(logger('dev'));
app.use(express.static('csv'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI',testAPIRouter);
app.use('/patientAPI',patientAPIRouter);
app.use('/login',loginAPIRouter);
app.use('/register',registerAPIRouter);
app.use('/member',memberAPIRouter);
app.use('/Airtable',airtableAPIRouter);
app.use('/history',medicalHistoryAPIRouter);

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
