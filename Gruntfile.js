module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["./less"],
                    yuicompress: true
                },
                files: {
                    "./public/stylesheets/style.css": "./less/base.less"
                }
            }
        },
        watch: {
            files: [
                "./less/*.less", 
                "./views/*",
                "./scripts/*.js"
            ],
            tasks: ["less", "cssmin", "concat"],
            options: {
              livereload: true,
            },
        },
        cssmin: {
          target: {
            files: {
              './public/stylesheets/style.min.css': [
                './bower_components/bootstrap/dist/css/bootstrap.min.css',
                './public/stylesheets/style.css'
              ]
            }
          }
        },
        concat: {
            dist: {
              src: [
                  './scripts/*'
              ],
              dest: './public/javascripts/scripts.js',
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['watch']);
};