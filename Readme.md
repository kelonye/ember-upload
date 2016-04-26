### File upload and progress components

![](https://dl.dropbox.com/u/30162278/ember-upload.png) 

Install
---

    $ component install kelonye/ember-upload


Example
---
    
    $ make example

Use
---

```javascript

/**
  * Module dependencies.
  */
var upload = require('ember-upload');
var App = Em.Application.create();

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

    var event = this.get('upload.loadend.currentTarget.responseText');
    console.log(event);

  }.observes('upload.loadend'),

});

App.FileProgressComponent = Em.Component.extend(upload.progress);

```

```html
{{#file-drop upload=upload}}
drop zone
{{/file-drop}}

{{file-progress upload=upload}}
```

S3 example:

```javascript

var upload = require('ember-upload');
var uid = require('node-uuid');

var S3 = {
  policy: '',
  signature: '',
  key: AWS_ACCESS_KEY_ID,
  acl: 'public-read',
  bucket: '',
  region: 's3-us-west-2'
};

S3.url = 'http://'+S3.bucket+'.'+S3.region+'.amazonaws.com/';
S3.staticUrl = 'https://'+S3.region+'.amazonaws.com/'+S3.bucket+'/';

App.FileDropComponent = Em.Component.extend(upload.drop, {
  
  // generate for every upload
  getUploadOptions: function(){

    return {

      url: S3.url,

      // sent in form data
      'key': uid.v4(),
      'AWSAccessKeyId': S3.key,
      'acl': S3.acl,
      'policy': S3.policy,
      'signature': S3.signature,
      'Content-Type': 'application/octet-stream'
    };

  },

  onProgress: function(){

    var progress = this.get('upload.progress');
    console.log(progress);

  }.observes('upload.progress'),

  onLoadEnd: function(){

    Em.run.later(function(){
      var path = S3.staticUrl + this.get('upload.opts.key');
      console.log('upload to path: %s', path);
    }, 1000);

  }.observes('upload.loadend'),

});

```

Todo
---

- X-browser.
- Ember CLI

License
---

MIT