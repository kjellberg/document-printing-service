function getOptions(sesscode) {
  return {
      tmpDir: __dirname + '/../public/uploads/tmp',
      uploadDir: __dirname + '/../public/uploads/files/' + sesscode + '/',
      uploadUrl: '/uploads/files/' + sesscode + '/',
      storage: {
        type: 'local'
      }
    };
}

module.exports = function(router) {
  router.get('/upload', function(req, res) {
    // Create session
    var sess = req.session

    // Return empty file list if no files is uploaded.
    if (!sess.hasFiles) res.send({ files: [] });

    else {

      require('blueimp-file-upload-expressjs')(getOptions(sess.code))
      .get(req, res, function(obj) {
        res.send(JSON.stringify(obj));
      });

    }
    
  });
 
  router.post('/upload', function(req, res) {

    // Create session
    var sess = req.session

    // Enable filelisting
    sess.hasFiles = true;

    require('blueimp-file-upload-expressjs')(getOptions(sess.code))
    .post(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });

  });
 
  router.delete('/uploads/files/:name', function(req, res) {
    uploader.delete(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });
  return router;
};