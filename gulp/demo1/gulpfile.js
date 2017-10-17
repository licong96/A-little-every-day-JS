var gulp = require('gulp');
var clean = require('gulp-clean');
var copy = require('gulp-copy');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');           //js规范验证
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');
var connect = require('gulp-connect');

// 先清除
gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

// html压缩
gulp.task('minify-html', function() {
  return gulp.src('src/page/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/page'));
});

// sass编译
gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())               // 加浏览器前缀
    .pipe(gulp.dest('src/css'));
});

// css合并
gulp.task('concat-css', function () {
  return gulp.src(['src/css/*.css', '!src/css/app.css'])
    .pipe(concat('app.css'))
    // .pipe(cleanCSS({compatibility: 'ie8'}))    // 压缩
    .pipe(gulp.dest('src/css'));
});

// css压缩
gulp.task('minify-css', function () {
  return gulp.src('src/css/app.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

//js规范验证
gulp.task('lint', function () {
  gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// js合并
gulp.task('concat-js', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('src/js'));
});

// js压缩
gulp.task('minify-js', function() {
  return gulp.src('src/js/*.js')
    .pipe(babel({             // 将ES6代码编译成ES5
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// 图片压缩
gulp.task('minify-images', function () {
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

// 把资源复制过去
gulp.task('copy-font',  function() {
  return gulp.src('src/font/*')
    .pipe(gulp.dest('dist/font'))
});

gulp.task('html', function () {
  gulp.src('src/**/*.html')
    .pipe(connect.reload());
});

// 启动开发版服务器
gulp.task('connect', function () {
  connect.server({
    name: 'dev',
    root: 'src',
    port: 8080,
    livereload: true
  });
});

// 启动编译压缩版服务器
gulp.task('connectDist', function () {
  connect.server({
    name: 'dist',
    root: 'dist',
    port: 80,
    livereload: true
  });
});

// 启动检查更新
gulp.task('watch', function () {
  gulp.watch(['src/**/*.html'], ['html']);
  gulp.watch(['src/js/*.js'], ['lint', 'html']);
  gulp.watch(['src/sass/**/*.scss'], ['sass']);
  gulp.watch(['src/css/*.css'], ['concat-css', 'html']);
});


// 本地开发服务器
gulp.task('server', ['connect', 'watch', 'sass', 'concat-css']);
gulp.task('build', ['minify-html', 'minify-css', 'minify-js', 'minify-images', 'copy-font']);
