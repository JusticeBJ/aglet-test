const gulp = require('gulp');
const sass = require('gulp-sass');
const concat= require('gulp-concat');
const terser= require('gulp-terser');
const browserSync = require('browser-sync').create();
var rename = require('gulp-rename');

//.....................................   == Compress all scss files into  style.min.css == ..........................
function style() { 
    var config= {};
    config.outputStyle= 'compressed';
	return gulp.src('./assets/sass/styles.scss') 
    .pipe(sass())  
    .pipe(sass(config)) 
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest('./assets/css/'));    
} 

//.....................................   == Compress all js files into  all.min.js  == ..........................
function script() {
    return gulp.src([
        './assets/js/plugins-js/jquery.min.js',
        './assets/js/plugins-js/popper.min.js',
        './assets/js/plugins-js/bootstrap.min.js',
        './assets/js/plugins-js/swiper.js',
        './assets/js/main.js'])
        .pipe(concat('all.min.js'))
        .pipe(terser())
        .pipe(gulp.dest('./assets/js'));
}

// .....................................   == Live Server == ..........................
function watch() {
    browserSync.init({ 
        sever: {
            baseDir: './'
        }
    });
    gulp.watch('./assets/sass/**/*.scss', style);
    gulp.watch('./assets/js/main.js', script); 
}



exports.style = style; 
exports.script = script;
exports.watch = watch;   
exports.default = watch;   

