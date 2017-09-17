const gulp = require('gulp');
const shell = require('gulp-shell');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const nodemon = require('gulp-nodemon');

// task to start the server running on port 8000
// allow for restart on change
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
// run all migrations 
gulp.task('migrate', shell.task([
    'sequelize db:migrate',
]));

// task to run tests
gulp.task('test', ['migrate'], function(){
    gulp.src(['./tests/controllers/*.js', './tests/models/*.js'])
        .pipe(mocha({
            reporter: 'spec'
        }));
});