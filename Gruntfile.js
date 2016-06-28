module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    babel: {
      options: {
        plugins: ['transform-react-jsx'],
        sourceMap: true,
        presets: ['es2015', 'react']
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
        dest: 'client/bundle.js'
      },
      test: {
        src: ['client/dist/**/*.js'],
        ignore: ['client/dist/**/app.js'],
        dest: 'client/test/bundle.js'
      }
    },
    sass: {
      dist: {
        files: {
          'client/public/styles/styles.css': 'client/public/styles/styles.scss'
        }
      }
    },
    watch: {
      transpile: {
        files: ['client/src/**/*.js'],
        tasks: ['babel', 'browserify:client']
      },
      sass: {
        files: ['client/public/styles/**/*.scss'],
        tasks: ['sass']
      }
    },
    shell: {
      testClient: {
        command: 'mocha --compilers js:babel-register --recursive --require client/test/dom.js client/test' 
      }
    }
  });

  grunt.registerTask('testClient', ['babel', 'browserify:test', 'shell:testClient']);

  grunt.registerTask('dev', ['babel', 'browserify:client', 'sass', 'watch']);

  grunt.registerTask('default', ['dev']);

};