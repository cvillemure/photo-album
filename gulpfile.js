var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var cleanCSS = require('gulp-clean-css');

const clientSourceFolder = path.join('src', 'client');
const clientDistFolder = path.join('dist', 'client');
const jsDestinationFolder = path.join(clientDistFolder, 'js');

const mainHtmlSrc = path.join(clientSourceFolder, 'index.html');
const fontsSrc = path.join(clientSourceFolder, 'fonts', '**', '*');
const imagesSrc = path.join(clientSourceFolder, 'images', '**', '*');
const extJsSrc = path.join(clientSourceFolder, 'js', 'ext', '**', '*');
const jsToTranspile = path.join(clientSourceFolder, 'js', '*.js');

gulp.task('sass', function () {
    const mainSassFile = path.join(clientSourceFolder, 'scss', 'app.scss');
    const cssDestinationFolder = path.join(clientDistFolder, 'css');
    gulp.src(mainSassFile)
        .pipe(sass())
        .pipe(cleanCSS({ compatibility: 'ie9' }))
        .pipe(gulp.dest(cssDestinationFolder));
});

gulp.task('babel', function () {
    gulp.src(jsToTranspile)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(jsDestinationFolder));
});

gulp.task('copy', function () {
    gulp.src(mainHtmlSrc).pipe(gulp.dest(clientDistFolder));

    const fontsDist = path.join(clientDistFolder, 'fonts');
    gulp.src(fontsSrc).pipe(gulp.dest(fontsDist));

    const extJsDist = path.join(clientDistFolder, 'js', 'ext');
    gulp.src(extJsSrc).pipe(gulp.dest(extJsDist));

    // To delete after development
    const imagesDist = path.join(clientDistFolder, 'images');
    gulp.src(imagesSrc).pipe(gulp.dest(imagesDist));
});

gulp.task('watch', function () {
    gulp.watch(mainHtmlSrc, ['copy']);
    gulp.watch(fontsSrc, ['copy']);
    gulp.watch(imagesSrc, ['copy']);
    gulp.watch(extJsSrc, ['copy']);
    gulp.watch(path.join(clientSourceFolder, 'scss', '**', '*'), ['sass']);
    gulp.watch(jsToTranspile, ['babel']);
});

gulp.task('build', ['copy', 'sass', 'babel']);

gulp.task('build:watch', ['build'], function () {
    gulp.start('watch');
});