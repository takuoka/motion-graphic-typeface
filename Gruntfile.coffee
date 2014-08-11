

module.exports = (grunt) ->

    conf =

        pkg: grunt.file.readJSON('package.json')

        connect:
          server:
            options:
                livereload: true



        coffee:
            compile:
                expand: true
                flatten: true
                src: ['*.coffee']
                ext: '.js'


        esteWatch:
            options:
                dirs: ['.', 'js/', 'css/']
                livereload:
                    enabled: true
                    extensions: ['html','css','js']
                    port: 35729
            coffee: (filepath) ->
                files = [
                    expand: true
                    ext: '.js'
                    src: filepath
                ]
                grunt.config 'coffee.compile.files', files
                ['coffee:compile']
    grunt.initConfig conf


    grunt.loadNpmTasks 'grunt-contrib-connect'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-este-watch'
    grunt.registerTask 'default', ['connect', 'esteWatch']
    return