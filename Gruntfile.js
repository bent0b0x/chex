module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('./tasks');

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
        src: ['client/dist/**/*.js', '!client/dist/bundle.js'],
        ignore: ['client/test/**/*'],
        dest: 'client/dist/bundle.js'
      }
    },
    clean: {
      img: ['client/dist/img/'],
      js: ['client/dist/js/'],
      dist: ['client/dist/'],
      styles: ['client/dist/styles/']
    },
    concat: {
      sass: {
        src: ['client/src/styles/**/*.scss', '!client/src/styles/styles.scss'],
        dest: 'client/src/styles/styles.scss'
      }
    },
    copy: {
      img: {
        expand: true,
        src: ['**'],
        dest: 'client/dist/img/',
        cwd: 'client/src/img'
      }
    },
    sass: {
      dist: {
        files: {
          'client/dist/styles/styles.css': 'client/src/styles/styles.scss'
        }
      }
    },
    shell: {
      'test-client': 'mocha --compilers js:babel-register --recursive client/test'
    },
    watch: {
      transpile: {
        files: ['client/src/**/*.js'],
        tasks: ['build-js']
      },
      sass: {
        files: ['client/src/styles/**/*.scss'],
        tasks: ['build-styles']
      },
      img: {
        files: ['client/src/img/**/*'],
        tasks: ['build-img']
      }
    }
  });

  grunt.registerTask('test-client', ['shell:test-client']);

  grunt.registerTask('build-img', ['clean:img', 'copy:img']);

  grunt.registerTask('build-styles', ['clean:styles', 'concat', 'sass']);

  grunt.registerTask('build-js', ['clean:js', 'babel', 'browserify:client']);

  grunt.registerTask('build-all', ['clean:dist', 'build-js', 'build-img', 'build-styles']);

  grunt.registerTask('dev', ['build-all', 'watch']);

  grunt.registerTask('default', ['dev']);

};