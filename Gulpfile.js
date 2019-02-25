// Load plugins
let gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    nunjucksRender = require('gulp-nunjucks-render'),
    bb = require('bitballoon');

// Styles
gulp.task('styles', function() {
  return sass('styles/app.scss', {'loadPath' : './'})
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('{js/global,lib}/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
gulp.task('page_scripts', function() {
  return gulp.src('js/pages/*.js')
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Page scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'page_scripts', 'images', 'html');
});

gulp.task('html', function() {
  // return [gulp.src('index.html')
  //  .pipe(gulp.dest('dist/'))
  //  .pipe(notify({message: 'HTML task complete'})),
  //  gulp.src('pages/**/*.html')
  //  .pipe(gulp.dest('dist/pages/')),
  //  gulp.src('fonts/**/*')
  //  .pipe(gulp.dest('dist/fonts/'))];

  return [gulp.src('./pages/**/*.+(html|nunjucks)')
          .pipe(nunjucksRender({path: ['./pages/partials']}))
          .pipe(gulp.dest('dist/')),

          gulp.src('fonts/**/*')
          .pipe(gulp.dest('dist/fonts/')),

          gulp.src('static/**/*')
          .pipe(gulp.dest('dist/static/'))
        ]
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('js/**/*.js', ['scripts', 'page_scripts']);

  // Watch image files
  gulp.watch('img/**/*', ['images']);

  // Watch html files
  gulp.watch('pages/**/*.+(html|nunjucks)', ['html']);

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', function(file) {
    gulp.src(file.path)
      .pipe(connect.reload())
  });
});

gulp.task('serve', ['default'], function() {
  connect.server({root: 'dist', livereload: true})
  gulp.start('watch')
});
