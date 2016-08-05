'use strict';

var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    stylus = require('gulp-stylus'),
    gulpIf = require('gulp-If'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    rename = require("gulp-rename"),
    jshint = require('gulp-jshint');


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('connect', function () {
    connect.server({
        root: 'application',
        livereload: true
    });
});

gulp.task('html', function () {
   return gulp.src('application/components/layout.jade')
       .pipe(plumber({errorHandler: notify.onError('Ошибка в html')}))
       .pipe(jade())
       .pipe(rename('index.html'))
       .pipe(gulp.dest('application/public/'))
       .pipe(connect.reload());
});

gulp.task('css', function() {
   return gulp.src('application/components/layout.styl')
       .pipe(plumber({errorHandler: notify.onError('Ошибка в css')}))
       .pipe(rename('style'))
       .pipe(gulpIf(isDevelopment, sourcemaps.init()))
       .pipe(stylus())
       .pipe(autoprefixer({
           browsers: ['last 2 versions','>1%', 'ie 9'],
           cascade: false
       }))
       .pipe(gulpIf(isDevelopment, sourcemaps.write()))
       .pipe(gulp.dest('application/public'))
       .pipe(connect.reload());
});


gulp.task('js', function() {
    return gulp.src('application/components/**/*.js')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('application/components/**/*.jade', ['html']);
    gulp.watch('application/components/**/*.styl', ['css']);
    gulp.watch('application/components/**/*.js', ['js'])
});

var defaulltTasks = ['html', 'css', 'js', 'watch'];
if(isDevelopment){
    defaulltTasks.unshift('connect');
}

gulp.task('default',defaulltTasks);