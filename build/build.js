import gulp from 'gulp';
import webpack from 'webpack';
import del from 'del';
import path from 'path';
import config from './config';
import sequence from 'run-sequence';


//clean build
gulp.task('clean-build', () => {
    del(['dist']).then(paths => {
        console.log('删除目录文件'+paths.join('\n'));
    });
});

// 拷贝静态资源
gulp.task('copy-asset',[], () => {
    gulp.src(path.join(config.src_path, 'api/**/*'))
        .pipe(gulp.dest(path.join(config.dist_path, 'api')));
        gulp.src(path.join(config.src_path, 'images/**/*'))
        .pipe(gulp.dest(path.join(config.dist_path, 'images')));
});

//gulp build 
gulp.task('build', ['clean-build'], () => {
    const webpackBuild = require('./webpack.build');
    webpack(webpackBuild, (err, stats) => {
        sequence('copy-asset');
    });
});