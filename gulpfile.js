var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require("gulp-sourcemaps");
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

gulp.task('hello', function() {
  console.log('hello zell');  
});


gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: [
      'Chrome >= 35',
      'Firefox >= 38',
      'Edge >= 12',
      'Explorer >= 10',
      'iOS >= 8',
      'Safari >= 8',
      'Android 2.3',
      'Android >= 4',
      'Opera >= 12' ]})]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/css'))
    .pipe(cleanCss())
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app',
      index: "theme.html"
    },
  })
});


gulp.task('copyJs', function(){
  return gulp.src('node_modules/bootstrap/dist/js/bootstrap*.js')
    .pipe(gulp.dest('app/js'))
});

gulp.task('watch', ['browserSync'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
})