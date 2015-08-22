'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('default', function() {
    gulp.src('./src/scss/*.scss')
    	.pipe(sass({outputStyle: 'compressed'}))
    	.pipe(gulp.dest('./dist'));

    gulp.src('./src/js/*.js')
    	.pipe(uglify())
    	.pipe(rename({
     		extname: '.min.js'
   		}))
    	.pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
 	gulp.watch('./src/scss/*.scss', ['default']);
 	gulp.watch('./src/js/*.js', ['default']);
});