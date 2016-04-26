/**
  * Module dependencies.
  */
var Upload = require('./upload');
var picker = require('file-picker');


module.exports = Em.Mixin.create({
  
  getUploadOptions: function(){},
  
  classNames: 'component upload drop'.w(),
  classNameBindings: 'over'.w(),
  over: false,

  didInsertElement: function(){
    this._super();

    var el = this.$()[0];
    el.addEventListener('click', this.onclick.bind(this), false);
    el.addEventListener('dragenter', this.ondragenter.bind(this), false);
    el.addEventListener('dragover', this.ondragover.bind(this), false);
    el.addEventListener('dragleave', this.ondragleave.bind(this), false);
    el.addEventListener('drop', this.ondrop.bind(this), false);
  },

  ondragenter: function(e) {
    this.set('over', true);
  },

  ondragover: function(e) {
    e.preventDefault();
    false;
  },

  ondragleave: function(e) {
    this.set('over', false);
  },

  ondrop: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.set('over', false);
    this.onupload(e.dataTransfer.files);
  },

  onclick: function(){
    var opts = {
      multiple: this.multiple,
      accept: this.accept,
      directory: this.directory
    };
    picker(opts, this.onupload.bind(this));
  },

  onupload: function(files){
    var opts = this.getUploadOptions();

    // var n = files.length;
    // while (n--){
    //   Upload.create().upload(files[n], opts);
    // }

    var file = files[0];
    if (!file) return;

    opts.file = file;
    
    this.set('upload', Upload.create({
      opts: opts,
    }));

  },

});
