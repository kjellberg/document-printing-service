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
            files: ["./less/*.less", "./views/*"],
            tasks: ["less", "cssmin"],
            options: {
              livereload: true,
            },
        },
        cssmin: {
          target: {
            files: {
              './public/stylesheets/style.min.css': ['./public/stylesheets/style.css']
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['watch']);
};