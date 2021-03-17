//===========================
//  Settings
//===========================
const port = 3001;
const php = false;
const mamp = false;
const dist = './dist';
const src = './src';
const ejsFile = src + '/ejs/**/*.ejs';
const _ejsFile = src + '/ejs/**/_*.ejs';
const sassFile = src + '/scss/**/*.scss';
const _sassFile = src + '/scss/**/_*.scss';
const jsFile = src + '/js/**/*.js';
const imagesFile = src + '/images/**';
//===========================
//  Require
//===========================
// Gulp
const gulp = require('gulp');
// EJS
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
// Sass
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
// JS
const webpackConfig = require('./webpack.config');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
// Browser
const browserSync = require('browser-sync');
const connect = require('gulp-connect-php');
//===========================
//  tasks
//===========================
// EJS
gulp.task('ejs', function (done) {
  gulp.src([ejsFile, '!'+_ejsFile])
    .pipe(ejs())
    .pipe(replace(/^[\s]*\n/, ''))
    .pipe(replace(/\n[\s]*\n/g, ''))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(dist + '/'));
  done();
});
// Sass
gulp.task('sass', function(done) {
  gulp
    .src([sassFile, '!'+_sassFile])
    .pipe(plumber({
        errorHandler: function(err) {
          if (err.messageFormatted) {
            console.log(err.messageFormatted);
          }
          this.emit('end');
        }
      }))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({
      cascade:false
    }))
    .pipe(gulp.dest(dist + '/assets/css/'))
  done();
});
// JS
gulp.task('js', function(done){
  webpackStream(webpackConfig, webpack)
    .pipe(plumber({
      errorHandler: function(err) {
          if (err.messageFormatted) {
            console.log(err.messageFormatted);
          }
        this.emit('end');
      }
    }))
    .pipe(gulp.dest(dist + '/assets/js'));
  done();
});
// Images
gulp.task('images', function(done) {
  gulp.src(imagesFile)
    .pipe(gulp.dest(dist + '/assets/images/'));
  done();
});
// Browser
gulp.task('build-server', function (done) {
  if (php) {
    connect.server({
      port: port,
      base: dist
    }, function (){
      browserSync({
        proxy: 'http://localhost:'+port+'/'
      });
    });
  } else if (mamp) {
    browserSync.init({
      proxy: "http://localhost:8888/",
      reloadOnRestart: true,
      startPath: dist + '/',
      open: 'external',
      notify: false
    });
  } else {
    browserSync.init({
        server: {
            baseDir: dist
        },
        startPath: dist + '/',
        open: 'external',
        notify: false
    });
  }
  done();
  console.log('Server was launched');
});
gulp.task('browser-reload', function (done) {
  browserSync.reload();
  done();
  console.log('Browser reload completed');
});
// Build
gulp.task('build', gulp.parallel('ejs', 'sass', 'js', 'images'));
// Watch
gulp.task('watch', function() {
  gulp.watch(ejsFile, gulp.series('ejs', 'browser-reload'));
  gulp.watch(sassFile, gulp.series('sass', 'browser-reload'));
  gulp.watch(jsFile, gulp.series('js', 'browser-reload'));
  gulp.watch(imagesFile, gulp.series('images', 'browser-reload'));
});
// Default
gulp.task('default', gulp.series('build', 'build-server', 'watch'));
