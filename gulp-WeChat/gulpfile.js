var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
var header = require('gulp-header');
var tap = require('gulp-tap');
var nano = require('gulp-cssnano');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var comments = require('postcss-discard-comments');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var pkg = require('./package.json');
var yargs = require('yargs').options({
  w: {
    alias: 'watch',
    type: 'boolean'
  },
  s: {
    alias: 'server',
    type: 'boolean'
  },
  p: {
    alias: 'port',
    type: 'number'
  }
}).argv;

var option = { base: 'src' };
var dist = __dirname + '/dist';

gulp.task('build:style', function() {
  var banner = [
    '/*!',
    ' * WeUI v<%= pkg.version %> (<%= pkg.homepage %>)',
    ' * Copyright <%= new Date().getFullYear() %> Tencent, Inc.',
    ' * Licensed under the <%= pkg.license %> license',
    ' */',
    ''
  ].join('\n');
  gulp
    .src('src/style/weui.less', option)
    .pipe(sourcemaps.init())
    .pipe(
      less().on('error', function(e) {
        console.error(e.message);
        this.emit('end');
      })
    )
    .pipe(postcss([autoprefixer(['iOS >= 7', 'Android >= 4.1']), comments()]))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(
      nano({
        zindex: false,
        autoprefixer: false
      })
    )
    .pipe(
      rename(function(path) {
        path.basename += '.min';
      })
    )
    .pipe(gulp.dest(dist));
});

gulp.task('build:index:assets', function() {
  gulp
    .src('src/**/*.?(png|jpg|gif|js)', option)
    .pipe(gulp.dest(dist))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('build:index:style', function() {
  gulp
    .src('src/index.less', option)
    .pipe(
      less().on('error', function(e) {
        console.error(e.message);
        this.emit('end');
      })
    )
    .pipe(postcss([autoprefixer(['iOS >= 7', 'Android >= 4.1'])]))
    .pipe(
      nano({
        zindex: false,
        autoprefixer: false
      })
    )
    .pipe(gulp.dest(dist))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('build:index:html', function() {
  gulp
    .src('src/index.html', option)
    .pipe(
      tap(function(file) {
        var dir = path.dirname(file.path);
        var contents = file.contents.toString();
        contents = contents.replace(
          /<link\s+rel="import"\s+href="(.*)">/gi,
          function(match, $1) {
            var filename = path.join(dir, $1);
            var id = path.basename(filename, '.html');
            var content = fs.readFileSync(filename, 'utf-8');
            return (
              '<script type="text/html" id="tpl_' +
              id +
              '">\n' +
              content +
              '\n</script>'
            );
          }
        );
        file.contents = new Buffer(contents);
      })
    )
    .pipe(gulp.dest(dist))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('build:index', [
  'build:index:assets',
  'build:index:style',
  'build:index:html'
]);

gulp.task('release', ['build:style', 'build:index']);

gulp.task('watch', ['release'], function() {
  gulp.watch('src/style/**/*', ['build:style']);
  gulp.watch('src/index.less', ['build:index:style']);
  gulp.watch('src/**/*.?(png|jpg|gif|js)', ['build:index:assets']);
  gulp.watch('src/**/*.html', ['build:index:html']);
});

gulp.task('server', function() {
  yargs.p = yargs.p || 8080;
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    ui: {
      port: yargs.p + 1,
      weinre: {
        port: yargs.p + 2
      }
    },
    port: yargs.p,
    startPath: '/'
  });
});

// 参数说明
//  -w: 实时监听
//  -s: 启动服务器
//  -p: 服务器启动端口，默认8080
gulp.task('default', ['release'], function() {
  if (yargs.s) {
    gulp.start('server');
  }

  if (yargs.w) {
    gulp.start('watch');
  }
});
