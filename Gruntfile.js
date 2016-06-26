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
        ignore: ['client/test/**/*'],
        dest: 'client/app.js'
      },
      test: {
        src: ['client/dist/**/*.js'],
        dest: 'client/test/app.js'
      }
    },
    watch: {
      transpile: {
        files: ['client/src/**/*.js'],
        tasks: ['babel', 'browserify:client']
      }
    },
    shell: {
      testClient: {
        command: 'mocha --compilers js:babel-register --recursive client/test' 
      }
    }
  });

  grunt.registerTask('testClient', ['babel', 'browserify:test', 'shell:testClient']);

  grunt.registerTask('dev', ['browserify', 'watch:transpile']);

  grunt.registerTask('default', ['dev']);

};