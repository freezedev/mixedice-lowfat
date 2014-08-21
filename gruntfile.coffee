module.exports = (grunt) ->
  
  sourceOrigin = 'src/**/*.coffee'
  
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    name: 'mixedice'
    coffeelint:
      source: ['src/**/*.coffee']
    coffee:
      compile:
        files: ['dist/<%= name %>.js': ['udefine/*.coffee', 'src/*.coffee'],
        {
          expand: true
          src: ['test/*.coffee']
          ext: '.js'
        }]
    mochaTest:
      options:
        reporter: 'spec'
      test:
        src: ['test/**/*.js']
    uglify:
      options:
        banner: '/*! <%= name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        report: 'gzip'
      dist:
        files:
          'dist/<%= name %>.min.js': 'dist/<%= name %>.js'
        

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)
  
  grunt.registerTask 'test', 'Lints and unit tests', ['coffeelint', 'mochaTest']
  grunt.registerTask 'default', 'Default task', ['coffee', 'test', 'uglify']