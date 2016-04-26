module.exports = Em.Object.extend({

  init: function() {

    var opts = this.get('opts');
    var url = opts.url;
    var form = new FormData;

    for (var key in opts){
      if (opts.url || opts.file) continue;
      form.append(key, opts[key]);
    }

    opts.file.slice = opts.file.slice || opts.file.webkitSlice;

    // form.append('Content-Length', opts.file.length);
    form.append('file', opts.file);

    var req = new XMLHttpRequest;
    req.onloadstart = this.onloadstart.bind(this);
    req.upload.onprogress = this.onprogress.bind(this);
    req.onload = this.onload.bind(this);
    req.onerror = this.onerror.bind(this);
    req.onabort = this.onabort.bind(this);
    req.onloadend = this.onloadend.bind(this);
    req.open('POST', opts.url);
    req.send(form);

  },

  onloadstart: function(e) {
    this.set('loadstart', e);
  },

  onprogress: function(e) {
    var progress;
    if (e.lengthComputable) progress = e.loaded / e.total * 100;
    this.set('progress', progress);
  },

  onload: function(e) {
    this.set('load', e);
  },

  onerror: function(e) {
    this.set('error', e);
    this.destroy();
  },

  onabort: function(e) {
    this.set('abort', e);
    this.destroy();
  },

  onloadend: function(e) {
    this.set('loadend', e);
    this.destroy();
  },

});
