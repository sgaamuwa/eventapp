const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('start', function(){
    let options = {
        script: './bin/www',
        env: {
            'PORT': 8000
        }
    }
    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting....');
        })
});