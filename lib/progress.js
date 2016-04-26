/**
  * Module dependencies.
  */
var progress = require('ember-progress');


module.exports = Em.Mixin.create(progress, {

  classNames: 'component upload progress'.w(),
  classNameBindings: 'show'.w(),
  show: false,

  onuprogress: function() {
    var progress = this.get('upload.progress') || 0;
    this.set('progress', progress);
    this.set('show', progress != 100);
  }.observes('upload.progress'),

  onabort: function() {
    var abort = this.get('upload.abort');
    if (abort) this.set('show', false);
  }.observes('upload.abort'),

  onerror: function() {
    var error = this.get('upload.error');
    if (error) this.set('show', false);
  }.observes('upload.error'),

});
