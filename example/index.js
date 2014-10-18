/**
  * Module dependencies.
  */
var Upload = require('ember-upload')('/upload');
var DropView = Upload.DropView;
var ProgressView = Upload.ProgressView;

// create drop view

DropView
  .create({
    template: Em.Handlebars.compile('upload/drop zone')
  })
  .appendTo('body');

// create progress view

ProgressView
  .create()
  .appendTo('body');

// info

Upload.addObserver('upload.progress', function(){
  var progress = this.get('upload.progress');
  console.log(progress);
});

Upload.addObserver('upload.loadend', function(){
  var event = this.get('upload.loadend.currentTarget.responseText');
  console.log(event);
});