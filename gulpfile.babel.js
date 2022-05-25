// generated on 2021-11-09 using generator-chrome-extension 0.7.2
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'gulp4-run-sequence';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();

gulp.task('extras', () => {
  return gulp.src([
    'APP/*.*',
    'APP/Message/**',
    '!APP/Script.lamda',
    '!APP/*.json',
    '!APP/*.html',
  ], {
    base: 'APP',
    dot: true
  }).pipe(gulp.dest('dist'));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe($.eslint(options))
      .pipe($.eslint.format());
  };
}

gulp.task('lint', lint('APP/Script.lamda/**/*.js', {
  env: {
    es6: true
  }
}));


gulp.task('html',  () => {
  return gulp.src('APP/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'APP', '.']}))
    .pipe($.sourcemaps.init())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
    .pipe($.sourcemaps.write())
    .pipe($.if('*.html', $.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true
    })))
    .pipe(gulp.dest('dist'));
});

gulp.task('chromeManifest', () => {
  return gulp.src('APP/manifest.json')
    .pipe($.chromeManifest({
      buildnumber: true,
      background: {
        target: 'Script.lamda/background.js',
        exclude: [
          'Script.lamda/chromereload.js'
        ]
      }
  }))
  .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
  .pipe($.if('*.js', $.sourcemaps.init()))
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.js', $.sourcemaps.write('.')))
  .pipe(gulp.dest('dist'));
});

gulp.task('babel', () => {
  return gulp.src('APP/Script.lamda/**/*.js')
      .pipe($.plumber())
      .pipe($.babel({
        presets: ['@babel/env']
      }))
      .pipe(gulp.dest('APP/Script'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('watch', gulp.series(['lint', 'babel']), () => {
  $.livereload.listen();

  gulp.watch([
    'APP/*.html',
    'APP/Script/**/*.js',
    'APP/images/**/*',
    'APP/styles/**/*',
    'APP/Messages/**/*.json'
  ]).on('change', $.livereload.reload);

  gulp.watch('APP/Script.lamda/**/*.js', ['lint', 'babel']);
  gulp.watch('bower.json', gulp.series(['wiredep']));
});

gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('wiredep', () => {
  gulp.src('APP/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('APP'));
});

gulp.task('package', function () {
  var manifest = require('./dist/manifest.json');
  return gulp.src('dist/**')
      .pipe($.zip('ads info analysis-' + manifest.version + '.zip'))
      .pipe(gulp.dest('package'));
});

gulp.task('build', (cb) => {
  runSequence(
    'lint', 'babel', 'chromeManifest',
    ['html', 'images', 'extras'],

    'size', cb);
});

gulp.task('default', gulp.series(['clean']), cb => {
  runSequence('build', cb);
});
