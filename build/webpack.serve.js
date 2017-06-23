import webpackServe from './webpack.common.js';
//
import webpack from 'webpack';
//
import config from './config';

//调试
webpackServe.devtool = 'eval';

//自动刷新，热替换
webpackServe.entry.app.unshift('webpack-dev-server/client?http://'+config.host_name+':'+config.host_port+'/','webpack/hot/dev-server'); 

//出口自定义设置
webpackServe.output =  {
    //编译输出路径
    path: config.src_path,

    //入口文件输出名字
    filename: 'scripts/[name].js',

    //html引入文件的路径，静态资源
    publicPath: '/'

};

//自定义插件
webpackServe.plugins = webpackServe.plugins.concat([

    // 开启全局的模块热替换（HMR）
    new webpack.HotModuleReplacementPlugin(),
    

    /*定义变量分辨是生产还是开发环境*/
    new webpack.DefinePlugin({
        webpack_api_path: JSON.stringify('src'),
    }),
    



]);
//
module.exports = webpackServe;