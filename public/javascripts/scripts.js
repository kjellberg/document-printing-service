Dropzone.options.myDropzone = {
  init: function() {
    var self = this;
    // config
    self.options.addRemoveLinks = true;
    self.options.dictRemoveFile = "Delete";
 
    // load already saved files
    $.get('/upload', function(data) {
      var files = JSON.parse(data).files;
      for (var i = 0; i < files.length; i++) {
 
        var mockFile = {
          name: files[i].name,
          size: files[i].size,
          type: 'image/jpeg'
        };
 
        self.options.addedfile.call(self, mockFile);

        // @todo: check if image or document.
        self.options.thumbnail.call(self, mockFile, files[i].url);

        $("#filelist").append('<li data-file="' + files[i].name + '">' + files[i].name + ', </li>');
        $("#createOrder").slideDown('slow').animate(
                { opacity: 1 },
                { queue: false, duration: 'slow' }
              );
      };
 
    });
 
    // on file upload success
    self.on("success", function(file) {
      $("#filelist").append('<li data-file="' + file.name + '">' + file.name + ', </li>');
    });

    //New file added
    self.on("addedfile", function(file) {
      $("#createOrder").slideDown('slow').animate(
        { opacity: 1 },
        { queue: false, duration: 'slow' }
      );
    });
 
    // Send file starts
    self.on("sending", function(file) {
      console.log('upload started', file);
      // $('.meter').show();
    });
 
    // File upload Progress
    self.on("totaluploadprogress", function(progress) {
      console.log("progress ", progress);
      $('.roller').width(progress + '%');
    });
 
    self.on("queuecomplete", function(progress) {
      //$('.meter').delay(999).slideUp(999);
    });
 
    // On removing file
    self.on("removedfile", function(file) {
      console.log(file);
      $.ajax({
        url: '/uploads/files/' + window.session_code + '/' + file.name,
        type: 'DELETE',
        success: function(result) {
          $('li[data-file="' + file.name + '"]').remove();
        }
      });
    });
 
  }
};