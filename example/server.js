/**
  * Module dependencies.
  */
var express = require('express');
var build = require('./build');

// app

var app = express();

// middleware

app.use(express.favicon());
// app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

// routes

app.get('/', function(req, res) {
  build(function(err){
    if (err) return res.send(500, err.message);
    res.sendfile(__dirname + '/view.html');
  });
});

app.post('/upload', function(req, res) {
  var file = req.files.file;
  if (!!!file) return res.send(400);
  res.json('/stored-here.png');
});

// bind

app.listen(3000);
console.log('http://localhost:3000');
