

var express = require('express');
var logger = require('morgan'); // Permet de gérer les logs et la coloration des messages.

var app = express();

app.use(logger('dev'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


module.exports = app;
