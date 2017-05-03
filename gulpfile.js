let source      = require('vinyl-source-stream'),
    gulp        = require('gulp'),
    browserify  = require('browserify'),
    reactify    = require('reactify'),
    babelify    = require('babelify'),
    watchify    = require('watchify'),
    imagemin    = require('gulp-imagemin'),
    del         = require('del'),
    useref      = require('gulp-useref'),
    cssnano     = require('gulp-cssnano'),
    minifyCSS   = require('gulp-minify-css'),
    buffer      = require('vinyl-buffer'),
    concatCSS   = require('gulp-concat-css'),
    production  = process.env.NODE_ENV === 'production';


gulp.task('default', ['clean', 'css', 'jsx'], function() {
    gulp.watch('docs/dev/*.css', ['css']);
    gulp.watch('docs/dev/*.js', ['jsx']);
});


gulp.task('css', function(){
    return gulp.src('docs/dev/**/*.css')
        .pipe(useref())
        .pipe(concatCSS('style.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('docs/include/'))
});
gulp.task('jsx', function(){
    return browserify({
        entries: './docs/dev/index.js',
        extensions: ['.jsx'],
        debug: process.env.NODE_ENV
    })
        .transform('babelify', {
            presets: ['es2015', 'react'],
            plugins: ['transform-class-properties']
        })
        .transform('browserify-css', {
            global: true
        })
        .bundle()
        .on('error', function(err){
            console.log('[browserify error]');
            console.log(err.message);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./docs/include/'));
});


gulp.task('clean', function() {
    return del.sync('docs/include/**');
});
