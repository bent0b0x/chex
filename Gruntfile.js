module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'client/src/',
            src: ['**/*.js'],
            dest: 'client/dist/'
          }
        ]
      }
    },
    browserify: {
      client: {
        src: ['client/dist/**/*.js'],
        dest: 'client/app.js'
      }
    },
    watch: {
      transpile: {
        files: ['client/src/**/*.js'],
        tasks: ['babel', 'browserify']
      }
    }
  });

  grunt.registerTask('dev', ['browserify', 'watch:transpile']);

  grunt.registerTask('default', ['dev']);

};