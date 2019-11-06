const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const gulpStylelint = require('gulp-stylelint');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('html', () => {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scss', () => {
    return gulp.src('app/scss/**/*.scss')
        .pipe(gulpStylelint({
            failAfterError: false,
            reporters: [
                {formatter: 'string', console: true}
            ]
        }))
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            grid: true
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('css-libs', () => {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'plugins/fancybox-master/dist/jquery.fancybox.css',
        'plugins/jquery-form-styler/jquery.formstyler.css',
    ])
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('app/scss/vendors'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', () => {
    return gulp.src('app/js/**/*.js')
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js-libs', () => {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/slick-carousel/slick/slick.js',
        'plugins/fancybox-master/dist/jquery.fancybox.js',
        'plugins/jquery-form-styler/jquery.formstyler.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', () => {
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/js/**/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('css-libs', 'scss', 'js-libs', 'browser-sync', 'watch'));
