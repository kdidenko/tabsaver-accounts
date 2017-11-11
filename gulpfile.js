const gulp = require('gulp');
const ts = require('gulp-typescript');
const gutil = require('gulp-util');
const project = ts.createProject('tsconfig.json');

const source = require('vinyl-source-stream');
const browserify = require('browserify');
const watchify = require('watchify');
const tsify = require("tsify");

var paths = {
	libs: 'src/lib/**/index.ts'
};

var watchedCode = watchify (
	browserify ({
		basedir: '.',
		debug: true,
		entries: [paths.libs],
		cache: {},
		packageCache: {}
	})
	.plugin(tsify)
);

function bundle() {
	return watchedCode
			.bundle()
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('dist/libs'))	
};

gulp.task('default', bundle);

watchedCode.on('update', bundle);
watchedCode.on('log', gutil.log);