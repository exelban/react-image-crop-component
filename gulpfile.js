let source =            require('vinyl-source-stream');
let gulp =              require('gulp');
let browserify =        require('browserify');
let babelify =          require('babelify');
let buffer =            require('vinyl-buffer');

gulp.task('default', ['jsx'], function() {
    gulp.watch(['docs/demo.js', 'lib/ReactImageCrop.js'], ['jsx']);
});

gulp.task('jsx', function(){
    return browserify({
            entries: './docs/demo.js',
            extensions: ['.jsx'],
            debug: !process.env.NODE_ENV
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
        .pipe(gulp.dest('./docs'));
});