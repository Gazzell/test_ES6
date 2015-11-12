var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');
var qunit = require('gulp-qunit');
var browserify = require('browserify');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');


gulp.task('default', function() {
    return browserify({
            entries:'src/uno.js',
            standalone: 'PACO_LIB',
            debug: true
        })
        .transform( babelify.configure({
            presets: ['es2015']
        }))
        .bundle()
        .pipe(source('out.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe( gulp.dest('dist'))
});

gulp.task('minificado', function() {
    return browserify({
        entries:'src/uno.js',
        standalone: 'PACO_LIB',
        debug: true
        })
        .transform( babelify.configure({
            presets: ['es2015']
        }))
        .bundle()
        .pipe(source('out.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        .pipe(uglify({outSourceMap: true }))
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe( gulp.dest('dist'))
});

gulp.task('test', function() {
    return gulp.src('./tests/*.html')
        .pipe(qunit());
});

gulp.task('testAndMin', ['minificado', 'test']);