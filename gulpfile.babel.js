import del from 'del';
import gulp from 'gulp';
import jest from 'gulp-jest';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import minify from 'gulp-babel-minify';

const src = './src/*.js';
const tests = './test/*.test.js';
const lib = './lib/';

const lint = () =>
  gulp.src(src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

const build = () =>
  gulp.src(src)
    .pipe(babel())
    .pipe(minify())
    .pipe(gulp.dest(lib));

const watch = () => gulp.watch(src, build);
const clean = () => del(lib);
const test = () => gulp.src(tests).pipe(jest());

gulp.task('lint', lint);
gulp.task('test', test);
gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
gulp.task('clean', clean);
gulp.task('default', gulp.series(clean, lint, build));
