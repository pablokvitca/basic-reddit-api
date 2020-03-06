var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Set up 404 errors
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that! Error 404. Please refer to the README.md for documentation details.")
})

// Set up 500 errors
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke! Please refer to the README.md for documentation details.");
})

module.exports = app;
