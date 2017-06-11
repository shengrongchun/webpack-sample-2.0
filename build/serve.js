import gulp from 'gulp';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import webpackDevMiddleware from 'webpack-dev-middleware';
import config from './config';
import path from 'path';



//gulp build 
gulp.task('serve', () => {
    const webpackServe = require('./webpack.serve');
    const compiler = webpack(webpackServe);
    //

    const server = new WebpackDevServer(compiler,{
        //contentBase: './src',
        stats: {
            colors: true,//输出彩色
            chunks: false,//是否显示块化过程
            modules: false,//是否显示模块化过程

        },

        //自动更新,需要在entry加入webpack-dev-server/client?url
        inline: true,

        //开启服务器热替换模式，注意需要加插件，和entry加入
        //hot: true,
        
        //是否启用gzip压缩
        compress: false,

        //请求类型
        https: false,

        //当使用HTML5 History API，任意的 404 响应可以提供为 index.html 页面
        historyApiFallback: true,




        //代理
        // proxy: {
        //     "/api": {
        //         target: "https://localhost:3000",
        //         pathRewrite: {"^/api" : ""},
        //         secure: false,  //无效证书的服务器也可以接受
        //     }
        // }


    });

    //
    server.listen(config.host_port || 8080,config.host_name || 'localhost',() => {
        console.log("Starting server on http://"+config.host_name+":"+config.host_port);
    });
});