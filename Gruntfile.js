(function() {
  module.exports = function(grunt) {
    var conf;
    conf = {
      pkg: grunt.file.readJSON('package.json'),
      connect: {
        server: {
          options: {
            livereload: true
          }
        }
      },
      coffee: {
        compile: {
          expand: true,
          flatten: true,
          src: ['*.coffee'],
          ext: '.js'
        }
      },
      esteWatch: {
        options: {
          dirs: ['.', 'js/', 'css/'],
          livereload: {
            enabled: true,
            extensions: ['html', 'css', 'js'],
            port: 35729
          }
        },
        coffee: function(filepath) {
          var files;
          files = [
            {
              expand: true,
              ext: '.js',
              src: filepath
            }
          ];
          grunt.config('coffee.compile.files', files);
          return ['coffee:compile'];
        }
      }
    };
    grunt.initConfig(conf);
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-este-watch');
    grunt.registerTask('default', ['connect', 'esteWatch']);
  };

}).call(this);
