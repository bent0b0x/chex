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
        src: [
          'client/dist/**/*.js',
          '!client/dist/src.js',
          '!client/dist/bundle.js'
        ],
        ignore: ['client/test/**/*'],
        dest: 'client/dist/src.js'
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
        src: [
          'client/lib/Materialize/bin/materialize.css',
          'client/src/styles/**/*.scss',
          '!client/src/styles/styles.scss'
        ],
        dest: 'client/src/styles/styles.scss'
      },
      js: {
        src: [
          'client/dist/src.js',
          'client/lib/jquery/dist/jquery.min.js',
          'client/lib/Materialize/dist/js/materialize.min.js'
        ],
        dest: 'client/dist/bundle.js'
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
      'test-client': 'mocha --compilers js:babel-register --recursive client/test',
      'bower-install': 'bower install'
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
      },
      test: {
        files: ['client/src/**/*', 'client/test/**/*'],
        tasks: ['test']
      }
    }
  });

  grunt.registerTask('test', ['test-client']);

  grunt.registerTask('test-client', ['shell:test-client']);

  grunt.registerTask('build-img', ['clean:img', 'copy:img']);

  grunt.registerTask('build-styles', ['clean:styles', 'concat:sass', 'sass']);

  grunt.registerTask('build-js', ['clean:js', 'babel', 'browserify:client', 'concat:js']);

  grunt.registerTask('build-all', ['clean:dist', 'build-js', 'build-img', 'build-styles']);

  grunt.registerTask('dev', ['shell:bower-install', 'build-all', 'watch']);

  grunt.registerTask('default', ['dev']);

};