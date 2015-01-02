function getOptions(sesscode) {
  return {
      tmpDir: __dirname + '/../public/uploads/tmp',
      uploadDir: __dirname + '/../public/uploads/files/' + sesscode + '/',
      uploadUrl: '/uploads/files/' + sesscode + '/',
      copyImgAsThumb : false,
      maxPostSize: 25000000, // 11 GB
      minFileSize: 1,
      maxFileSize: 20000000, // 10 GB
      acceptFileTypes: /\.(pdf|docx?|txt|odt|csv|xlsx?)/i,
      inlineFileTypes: /\.(pdf|docx?|txt|odt|csv|xlsx?)/i,

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
 
  router.delete('/uploads/files/:sc/:name', function(req, res) {

    // Create session
    var sess = req.session

    console.log(req);

    require('blueimp-file-upload-expressjs')(getOptions(sess.code))
    .delete(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  return router;
};