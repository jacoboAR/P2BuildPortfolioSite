var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    cleanCSS   = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    changed    = require('gulp-changed'),
    imagemin   = require('gulp-imagemin'),
    minifyhtml = require('gulp-htmlmin'),
    webserver  = require('gulp-webserver'),
    del        = require('del');

var paths = {
    styles: [
        'node_modules/normalize.css/normalize.css',
        'src/styles/*.css'
    ],
    images: ['src/images/*'],
    html: ['src/index.html']
}

gulp.task('css', function(){
    gulp.src(paths.styles)
        .pipe(concat('styles.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('build/styles/'));
});

gulp.task('imagemin', function() {
   var imgSrc = 'src/images/*',
   imgDst = 'build/images';
   
    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(imgDst));
});

gulp.task('watch', function() {
    gulp.watch(paths.styles, ['css']);
    gulp.watch(paths.html, ['html']); 
    gulp.watch(paths.images, ['imagemin']); 
});

gulp.task('html', function() {
    gulp.src(paths.html)
        .pipe(minifyhtml({collapseWhitespace: true}))
        .pipe(gulp.dest('./build'))
});

gulp.task('webserver', function() {
    gulp.src('build')
        .pipe(webserver({
            livereload: true,
            port: 8000
        }));
});

gulp.task('clean', function() {
    del(['build']);
});

gulp.task('build', ['css', 'imagemin', 'html']);

gulp.task('default', ['build', 'watch', 'webserver']);
