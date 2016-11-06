/**
 * Created by Zowie on 21-09-16.
 */

// Define gulp basepaths
var basePaths = {
    basedir: './app/',
    bower: './bower_components/',
    dev: './src/'
};

// browser-sync watched files
var browserSyncWatchFiles = [
    'app/*.html',
    'app/js/*.js',
    'app/css/*.css'
];

// bower-sync options
var browserSyncOptions = {
    server: {
        baseDir: 'app'
    }
};


// require gulp packages and stock gulp requirements
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Run:
// $ gulp sass
// sass task for converting scss to css in the app/css folder
gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
});

// Run:
// $ gulp watch
// gulp watcher use this one if you edit scss files within the scss folder
gulp.task('watch', function (){
    gulp.watch('app/scss/**/*.scss', ['sass'], ['cssnano']);
    gulp.watch('app/scss/style.scss', ['sass'], ['cssnano']);
    gulp.watch('app/css/style.css', ['cssnano']);
    gulp.watch('app/*.html');
    gulp.watch('app/js/**/*.js');
});

// Run:
// $ gulp cssnano
// Minifies CSS files
gulp.task('cssnano', ['cleancss'], function(){
    return gulp.src('app/css/*.css')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(plumber())
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano({discardComments: {removeAll: true}}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/css/'))
        .pipe(reload({stream: true}));
});

// Run:
// $ gulp cleancss
// Sub gulp task for overwriting minified css class
gulp.task('cleancss', function() {
    return gulp.src('app/css/*.min.css', { read: false }) // much faster
        .pipe(ignore('style.css'))
        .pipe(rimraf());
});

// Run:
// $ gulp browser-sync
// Starts browser-sync task for starting the server.
gulp.task('browserSync', function() {
    browserSync.init(browserSyncWatchFiles, browserSyncOptions)
});

// Run:
// $ gulp watch-bs
// Starts watcher with browser-sync. Browser-sync reloads page automatically on your browser
gulp.task('watch-bs', ['browserSync', 'watch', 'cssnano'], function (){ });

// Run:
// $ gulp scripts
// This will compile en uglify the included scripts to a main javascript which will be exported as minified and maxified file
// include scripts from src map and concat them to a new dir called /js/
gulp.task('scripts', function () {
    gulp.src([
        basePaths.dev + 'js/jquery/jquery.js',
        basePaths.dev + 'js/bootstrap/js/bootstrap.js',
        basePaths.dev + 'js/aos/aos.js'
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(basePaths.basedir + '/js/'));

    gulp.src([
        basePaths.dev + 'js/jquery/jquery.js',
        basePaths.dev + 'js/bootstrap/js/bootstrap.js',
        basePaths.dev + 'js/aos/aos.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(basePaths.basedir + '/js/'));
});

// Run:
// $ gulp copy-scripts
// If you downloaded new files with bower be sure to run this task first and include the correct script path
// Copy assets from bower dir to src dir
gulp.task('copy-scripts', function () {
    gulp.src(basePaths.bower + 'jquery/dist/**/*.js')
        .pipe(gulp.dest(basePaths.dev + '/js/jquery'));

    gulp.src(basePaths.bower + 'bootstrap/dist/**/*.js')
        .pipe(gulp.dest(basePaths.dev + '/js/bootstrap'));

    gulp.src(basePaths.bower + 'aos/dist/**/*.js')
        .pipe(gulp.dest(basePaths.dev + '/js/aos'));
});

// Run:
// $ gulp copy-css
// If you downloaded new files with bower be sure to run this task first and include the correct script path
// Copy assets from bower dir to src dir
gulp.task('copy-css', function () {

    gulp.src(basePaths.bower + 'bootstrap/dist/css/*')
        .pipe(gulp.dest(basePaths.dev + '/css/bootstrap'));

    gulp.src(basePaths.bower + 'font-awesome/css/*')
        .pipe(gulp.dest(basePaths.dev + '/css/font-awesome'));

    gulp.src(basePaths.bower + 'simple-line-icons/css/*.css')
        .pipe(gulp.dest(basePaths.dev + '/css/simple-line-icons'));

    gulp.src(basePaths.bower + 'aos/dist/*.css')
        .pipe(gulp.dest(basePaths.dev + '/css/aos'));
});

// Run:
// $ gulp copy-fonts
// If you downloaded new files with bower be sure to run this task first and include the correct script path
// Copy assets from bower dir to src dir
gulp.task('copy-fonts', function () {

    gulp.src(basePaths.bower + 'bootstrap/dist/fonts/*')
        .pipe(gulp.dest(basePaths.dev + '/fonts/bootstrap'));

    gulp.src(basePaths.bower + 'font-awesome/fonts/*')
        .pipe(gulp.dest(basePaths.dev + '/fonts/font-awesome'));

    gulp.src(basePaths.bower + 'simple-line-icons/fonts/*')
        .pipe(gulp.dest(basePaths.dev + '/fonts/simple-line-icons'));
});

// Run:
// $ gulp copy-assets
// If you downloaded new files with bower be sure to run this task first and include the correct script path
// Copy assets from bower dir to src dir
gulp.task('copy-assets', function () {

    gulp.src(basePaths.dev + 'css/bootstrap/bootstrap.css')
        .pipe(rename({ extname: ".scss" }))
        .pipe(gulp.dest(basePaths.basedir + '/scss/bootstrap/'));

    gulp.src(basePaths.dev + 'css/aos/aos.css')
        .pipe(rename({ extname: ".scss" }))
        .pipe(gulp.dest(basePaths.basedir + '/scss/aos/'));

    gulp.src(basePaths.dev + 'css/font-awesome/font-awesome.css')
        .pipe(rename({ extname: ".scss" }))
        .pipe(gulp.dest(basePaths.basedir + '/scss/font-awesome/'));

    gulp.src(basePaths.dev + 'css/simple-line-icons/simple-line-icons.css')
        .pipe(rename({ extname: ".scss" }))
        .pipe(gulp.dest(basePaths.basedir + '/scss/simple-line-icons/'));

    gulp.src(basePaths.dev + 'fonts/bootstrap/*')
        .pipe(gulp.dest(basePaths.basedir + '/fonts/'));

    gulp.src(basePaths.dev + 'fonts/font-awesome/*')
        .pipe(gulp.dest(basePaths.basedir + '/fonts/'));

    gulp.src(basePaths.dev + 'fonts/simple-line-icons/*')
        .pipe(gulp.dest(basePaths.basedir + '/fonts/'));
});