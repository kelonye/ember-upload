/**
  * Module dependencies.
  */
var upload = require('ember-upload');
var App = Em.Application.create();

Em.TEMPLATES.index = Em.HTMLBars.template(require('./template'));

App.FileDropComponent = Em.Component.extend(upload.drop, {

  getUploadOptions: function(){
    return {
      url: '/upload',
    };
  },
  
  onProgress: function(){

    var progress = this.get('upload.progress');
    console.log(progress);

  }.observes('upload.progress'),

  onLoadEnd: function(){

    this.set('upload.dest', this.get('upload.loadend.currentTarget.responseText'));

  }.observes('upload.loadend'),

});

App.FileProgressComponent = Em.Component.extend(upload.progress);
