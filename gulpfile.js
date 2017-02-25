var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');

console.log(__dirname);

gulp.task('sass', function() {
    gulp.src('public/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return path.join(f.base,'..','css');;
        }))
});

gulp.task('default', ['sass'], function() {
    gulp.watch('public/scss/*.scss', ['sass']);
})