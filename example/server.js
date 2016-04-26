/**
  * Module dependencies.
  */
var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var build = require('./build');
var join = require('path').join;
var multer = require('multer')({ dest: join(__dirname, '/tmp') });

// app

var app = express();

// middleware

app.use(serveStatic(__dirname + '/public'));
app.use(serveStatic(__dirname + '/tmp'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// routes

app.get('/', function(req, res) {
  build(function(err){
    if (err) return res.status(500).send(err.message);
    res.sendFile(__dirname + '/template.html');
  });
});

app.post('/upload', multer.single('file'), function(req, res) {
  var file = req.file.path;
  if (!!!file) return res.status(400).end();
  res.json(file);
});

// bind

app.listen(3000);
console.log('started app on port 3000');
