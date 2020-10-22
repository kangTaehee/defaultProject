const { task, series, parallel, watch } = require('gulp');
const gulp                              = require('gulp');
const chokidar                          = require('chokidar');
const jspOut                            = false; // 콘텐트(cts)생성
const sourcemaps                        = require('gulp-sourcemaps');
const sass                              = require('gulp-sass');
const browserSync                       = require('browser-sync').create();
const autoprefixer                      = require('gulp-autoprefixer');
const headerfooter                      = require('gulp-headerfooter');
const remove                            = require('gulp-remove-content');
const rename                            = require('gulp-rename');
const imagemin                          = require('gulp-imagemin');
const removeEmptyLines                  = require('gulp-remove-empty-lines');
const spritesmith                       = require('gulp.spritesmith');
const imageResize                       = require('gulp-image-resize');
const reload                            = browserSync.reload;
const merge                             = require('merge');
const inlineCss 						= require('gulp-inline-css');
const concat = require('gulp-concat');
const scssOptions = {
	errLogToConsole: true,
	indentType: 'space', // space tab
	indentWidth: 0, // outputStyle 이 nested, expanded 인 경우에 사용
	precision: 6, //Default : 5 CSS 의 소수점 자리수
	sourceComments: false,
	outputStyle: 'compressed' //nested, expanded, compact, compressed
	// outputStyle: 'compact' //nested, expanded, compact, compressed
};
function servers() {
	//https://browsersync.io/docs/options
	browserSync.init({
		server: {
			baseDir: './',
			index: 'static/guide/index.html',
		},
		port: 3000,
	});
}
const scss        = ['commons', 'kdhc', 'bos'];
const projectlist = ['kdhc','bos'] // content, lib

function scssTocss(targets) {
	gulp.src('static/' + targets + '/scss/*.scss')
		.pipe(sourcemaps.init({ loadMaps: false }))
		.pipe(sass(scssOptions).on('error', sass.logError))
		.pipe(
			autoprefixer({
				browsers: ['last 2 versions'],
				cascade: true,
			})
		)
		.pipe(sourcemaps.write('./'))
		//.pipe(removeEmptyLines())
		.pipe(gulp.dest('static/' + targets + '/css/'))
		.pipe(browserSync.stream());
}
function watchscss(kk) {
	console.log(kk, scss[kk], '← 프로젝트 scss (⌐■_■)');
	watch(['static/' + scss[kk] + '/scss/*.scss'], function (cb) {
		console.log(scss[kk], '( •̀ ω •́ )y');
		scssTocss(scss[kk]);
		cb();
	});
}

function wscss(params) {
	for (var i = scss.length - 1; i >= 0; i--) {
		watchscss(i);
	}
}

function waths() {
	wscss()
	console.log('waths 시작');
	// html
	watchLibraryReload();
	watchLibrary('kdhc');
	watchLibrary('bos');
	// 
	watchCts('kdhc');
	watchCts('bos');
	// 
	watchContent('kdhc');
	watchContent('bos');
}

function watchLibraryReload(targets) {
	watch('**/*.{js,html}',{ delay: 500 }).on('change', function (event) {
		console.log('File ' +  'change => ' + event + ', running tasks...1');
		browserSync.reload();
	});
}


const Vinyl = require('vinyl');

function watchLibrary(targets) {
	const watcher = watch(['static/guide/' + targets + '/lib/*.html']);
	watcher.on('change', function (paths, stats) {
		const file = new Vinyl({
			path: paths,
		});
		gulp.src(file.dirname + '/' + file.stem + file.extname)
			.pipe(headerfooter.header('static/guide/' + targets + '/top.html'))
			.pipe(headerfooter.footer('static/guide/' + targets + '/bottom.html'))
			.pipe(gulp.dest('static/guide/' + targets + '/dist'));
	});
}
function watchContent(targets) {
	const watcher = watch('static/guide/' + targets + '/content/*.html');
	watcher.on('change', function (paths, stats) {
		const file = new Vinyl({
			path: paths,
		});
		gulp.src(file.dirname + '/' + file.stem + file.extname)
			.pipe(headerfooter.header('static/guide/' + targets + '/top.html'))
			.pipe(headerfooter.footer('static/guide/' + targets + '/bottom.html'))
			.pipe(gulp.dest('static/guide/' + targets + '/dist'));
		if (jspOut) {
			gulp.src(file.dirname + '/' + file.stem + file.extname)
				.pipe(headerfooter.header('<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>'))
				.pipe(rename({ extname: '.jsp' }))
				.pipe(gulp.dest('WEB-INF/jsp/cts/' + targets + '/'));
		}
	});
}

function watchCts(targets) {
	function jspToHtml(paths, event){
		// console.log(paths, event);
		const file = new Vinyl({
			path: paths
		});
		gulp.src(file.dirname + '/' + file.stem + file.extname)
			.pipe(headerfooter.header('static/guide/' + targets + '/top.html'))
			.pipe(headerfooter.footer('static/guide/' + targets + '/bottom.html'))
			.pipe(rename({extname: ".html"}))
			.pipe(gulp.dest('./static/guide/' + targets + '/dist'));
	}
	// chokidar.watch('WEB-INF/jsp/cts/' + targets + '/*.jsp').on('add'   , (paths, event) => { jspToHtml(paths, event) })
	chokidar.watch('WEB-INF/jsp/cts/' + targets + '/*.jsp').on('change', (paths, event) => { jspToHtml(paths, event) })
}

function mail() {
	return gulp.src('static/guide/kdhc/mail/*') //대상 파일
	.pipe(inlineCss())
	.pipe(gulp.dest('static/guide/kdhc/mail/build/'))
}


function tojsp(cb) {
	for (var i = projectlist.length - 1; i >= 0; i--) {
		gulp
		.src(`static/guide/${projectlist[i]}/content/*.html`)
		.pipe(headerfooter.header('<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>'))
		.pipe(rename({extname: ".jsp"}))
		.pipe(gulp.dest(`WEB-INF/jsp/cts/${projectlist[i]}/`))
	}
	cb();
}

function dist(cb) {
	var targets = 'nmc'
	gulp.src('static/guide/' + targets + '/content/*.html')
		.pipe(headerfooter.header('static/guide/' + targets + '/top.html'))
		.pipe(headerfooter.footer('static/guide/' + targets + '/bottom.html'))
		.pipe(gulp.dest('static/guide/' + targets + '/dist'));

	gulp.src('static/guide/' + targets + '/lib/*.html')
		.pipe(headerfooter.header('static/guide/' + targets + '/top.html'))
		.pipe(headerfooter.footer('static/guide/' + targets + '/bottom.html'))
		.pipe(gulp.dest('static/guide/' + targets + '/dist'));
	cb();	
}

function htmlmerge(cb) {
	gulp.src('static/guide/kdhc/lib/*.html')
		.pipe(concat('all.html'))
		.pipe(headerfooter.header('static/guide/kdhc/top.html'))
		.pipe(headerfooter.footer('static/guide/kdhc/bottom.html'))
		.pipe(gulp.dest('static/guide/kdhc/'));
	cb();
}

function sprite(cb) {
	// Generate our spritesheet
	var path = 'static/kdhc/img/sprite/'
	var site = 'nmc'
	var spriteData = gulp.src(path+'*.png').pipe(spritesmith({
		// imgName      : 'sprite.png',
		// cssName      : 'sprite.scss'
		// This will filter out `fork@2x.png`, `github@2x.png`, ... for our retina spritesheet
		// The normal spritesheet will now receive `fork.png`, `github.png`, ...
//		retinaSrcFilter : path+'*@2x.png',
		imgName         : 'sprite.png',
		// retinaImgName   : 'sprite@2x.png',
		cssName         : '_sprite.scss',
		padding         : 10,//이미지와의 간격
		imgPath         : '/static/sign/img/sprite.png' //scss에서 사용하는 background-img url
	}));
	// Pipe image stream through image optimizer and onto disk
	var imgStream = spriteData.img
		// DEV: We must buffer our stream into a Buffer for `imagemin`
		// .pipe(buffer())
		// .pipe(imagemin())
		.pipe(gulp.dest(`static/${site}/img/`));
	// Pipe CSS stream through CSS optimizer and onto disk
	var cssStream = spriteData.css
		// .pipe(csso())
		.pipe(gulp.dest(`static/${site}/scss/`));
	// Return a merged stream to handle both `end` events
	// return merge(imgStream, cssStream);
	cb()
}

function imgmin(cb) {
	gulp.src('static/*/img/**')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
		cb()
}

// exports.watchscss = watchscss;
exports.default      = series(parallel(servers, waths));
// exports.default   = series(clean, parallel(html, watchFiles));
exports.server       = series(servers);
exports.mail         = mail;
exports.imgmin       = imgmin;
exports.tojsp        = tojsp;
exports.dist         = dist;
exports.htmlmerge    = htmlmerge;
exports.sprite       = sprite;
/*
Gulp 4.0 에서는 Task 실행 순서를 통제할 수 있는 API를 제공한다. 따라서 앞으로 run-sequence 모듈을 사용하지 않아도 된다.
parallel 함수는 Task를 병렬로 실행하는데 기존 gulp.task(‘build’, [‘html’, ‘css’]); 방식의 실행 순서에 대응된다.
*/