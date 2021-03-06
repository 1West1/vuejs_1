let gulp = require('gulp'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch');

gulp.task('sass', function() {
	return gulp.src('sass/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css'))
});

gulp.task('watch', function() {
	gulp.watch('sass/**/*.scss', gulp.series('sass'))
});