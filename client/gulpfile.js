var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');
//var initReleaseTasks = require('./tasks/release');

/**
 * Tasks are added by the react-component-gulp-tasks package
 *
 * See https://github.com/JedWatson/react-component-gulp-tasks
 * for documentation.
 *
 * You can also add your own additional gulp tasks if you like.
 */

// Read the package.json to detect the package name
var pkg = JSON.parse(require('fs').readFileSync('./package.json'));

var taskConfig = {

  component: {
    name: 'App',
    dependencies: [
      'browserify-optional',
      'classnames',
      'eve',
      'react',
      'react-dom',
      'snapsvg-cjs'
    ],
    lib: 'lib',
    file: 'App.js',
    src: 'src/public',
    dist: 'dist',
    pkgName: pkg.name
  },

  example: {
    src: 'src',
    dist: 'dist',
    files: [
      'index.html',
      '.gitignore',
      'normalize.css',
      'fonts/**/*'
    ],
    scripts: [
      'index.js'
    ],
    less: [
      'index.less'
    ]
  }

};

var releaseConfig = {
  files: [
    'dist',
    'lib',
    'client',
    'package.json',
    'bower.json'
  ],
  version: pkg.version
};

initGulpTasks(gulp, taskConfig);
//initReleaseTasks(gulp, releaseConfig);

//gulp.task('default',initGulpTasks(gulp,taskConfig))
