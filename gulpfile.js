const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const uglify = require('gulp-uglify');
const del = require('del');

function clean() {
    return del(['dist']);
}

function styles() {
    return gulp.src('src/styles/main.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(rename('bundle.min.css'))
        .pipe(gulp.dest('dist'))
}

function scripts() {
    return gulp.src('src/scripts/main.js')
        .pipe(babel())
        .pipe(browserify())
        .pipe(uglify())
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('dist'))
}

function assets() {
    return gulp.src([
        'src/images/*.*',
        'src/index.html'
    ])
        .pipe(gulp.dest('dist'))
}

const build = gulp.series(clean, gulp.parallel(styles, scripts, assets));

gulp.task('default', build);
