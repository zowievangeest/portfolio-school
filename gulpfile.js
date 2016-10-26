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
    gulp.watch('app/scss/**/*.scss', ['sass']);
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
        basePaths.dev + 'js/countup/countUp.js'
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(basePaths.basedir + '/js/'));

    gulp.src([
        basePaths.dev + 'js/jquery/jquery.js',
        basePaths.dev + 'js/countup/countUp.js'
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

    gulp.src(basePaths.bower + 'jquery-smooth-scroll/*.js')
        .pipe(gulp.dest(basePaths.dev + '/js/jquery-smooth-scroll'));

    gulp.src(basePaths.bower + 'lightbox2/dist/**/*.js')
        .pipe(gulp.dest(basePaths.dev + '/js/lightbox2'));

    gulp.src(basePaths.bower + 'owl.carousel/dist/**/*.js')
        .pipe(gulp.dest(basePaths.dev + '/js/owl-carousel'));
});

// Run:
// $ gulp copy-css
// If you downloaded new files with bower be sure to run this task first and include the correct script path
// Copy assets from bower dir to src dir
gulp.task('copy-css', function () {

    gulp.src(basePaths.bower + 'bootstrap/dist/css/*')
        .pipe(gulp.dest(basePaths.dev + '/scss/bootstrap'));

    gulp.src(basePaths.bower + 'font-awesome/css/*')
        .pipe(gulp.dest(basePaths.dev + '/scss/font-awesome'));

    gulp.src(basePaths.bower + 'lightbox2/dist/css/*')
        .pipe(gulp.dest(basePaths.dev + '/scss/lightbox2'));

    gulp.src(basePaths.bower + 'owl.carousel/dist/**/*.css')
        .pipe(gulp.dest(basePaths.dev + '/scss/owl-carousel'));

    gulp.src(basePaths.bower + 'simple-line-icons/scss/*.scss')
        .pipe(gulp.dest(basePaths.dev + '/scss/simple-line-icons'));
});