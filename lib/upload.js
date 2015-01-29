module.exports = function(U) {
  U.Upload = Em.Object.extend({
    init: function() {
      this._super();
      U.set('upload', this);
    },
    upload: function(file) {
      
      this.set('file', file);
      file.slice = file.slice || file.webkitSlice;

      var form = new FormData;

      var opts = U.get('opts') || {};
      for (var key in opts){
        form.append(key, opts[key]);
      }

      // form.append('Content-Length', file.length);
      form.append('file', file);

      var req = this.req = new XMLHttpRequest;
      req.onloadstart = this.onloadstart.bind(this);
      req.upload.onprogress = this.onprogress.bind(this);
      req.onload = this.onload.bind(this);
      req.onerror = this.onerror.bind(this);
      req.onabort = this.onabort.bind(this);
      req.onloadend = this.onloadend.bind(this);

      var to = U.get('to');
      req.open('POST', to);

      return req.send(form);
    },
    onloadstart: function(e) {
      this.set('loadstart', e);
    },
    onprogress: function(e) {
      var progress;

      progress = void 0;
      if (e.lengthComputable) {
        progress = e.loaded / e.total * 100;
      }
      return this.set('progress', progress);

    },
    onload: function(e) {
      return this.set('load', e);
    },
    onerror: function(e) {
      this.set('error', e);
      return this.destroy();
    },
    onabort: function(e) {
      this.set('abort', e);
      return this.destroy();
    },
    onloadend: function(e) {
      this.set('loadend', e);
      return this.destroy();
    }
  });
};
