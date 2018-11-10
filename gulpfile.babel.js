import del from 'del';
import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import minify from 'gulp-babel-minify';

const src = './src/*.js';
const lib = './lib/';

const lint = () =>
  gulp.src(src)
    .pipe(eslint());

const build = () =>
  gulp.src(src)
    .pipe(babel())
    .pipe(minify())
    .pipe(gulp.dest(lib));

const watch = () => gulp.watch(src, build);
const clean = () => del(lib);

gulp.task('lint', lint);
gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));
gulp.task('clean', clean);
gulp.task('default', gulp.series(clean, lint, build));
