"use strict"

var gulp 		= require('gulp'),
	sass 		= require('gulp-sass'),
	cssnano 	= require('cssnano'),//минимизация кода css
	concat 		= require('gulp-concat'), //конкатинация файлов
	uglify 		= require('gulp-uglify'), //минимизация js
	//notify 		= require('gulp-notify'), //вывод окна с уведомлением о событиях в Gulp
	autoprefixer= require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create();
	
//sass
gulp.task('sass', ()=> {

return gulp.src("app/sass/**/*.scss")
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 15 version']}))      
    .pipe(gulp.dest("app/css"))    
    .pipe(browserSync.stream());
});

//js-user
gulp.task('js-user', ()=> {
	return gulp.src([
		'app/js/common.js',
	])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

//js
gulp.task('js', ['js-user'], ()=>{
	return gulp.src([])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.stream());
});
//browserSync
gulp.task('brSync', ()=>{

	browserSync.init({
		server: './app'
	});

	

});

gulp.task('watch',['sass','js', 'brSync'], ()=> {
	gulp.watch("app/sass/**/*.scss", ['sass']);
	gulp.watch(['app/libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch("app/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['watch']);

// gulp.task('watch', ['serve', 'sass'], function() {
//     gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами
    
// });






