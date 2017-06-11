import webpackBuild from './webpack.common';
//
import webpack from 'webpack';
//
import config from './config';


//出口自定义设置
webpackBuild.output =  {
    //编译输出路径
    path: config.dist_path,

    //入口文件输出名字
    filename: 'scripts/[name]_[chunkhash:8].min.js',

    //不是入口文件，是文件里面的依赖文件输出名字规则
    chunkFilename: '[name]_[chunkhash:8].min.js',

    //是否启用跨域加载chunk，默认false，不加载,anonymous, 加载
    crossOriginLoading: false,

    //html引入文件的路径
    publicPath: '',
};

//自定义插件
webpackBuild.plugins = webpackBuild.plugins.concat([

    //webpack自带插件压缩js
    new webpack.optimize.UglifyJsPlugin({ // js、css都会压缩
        mangle: {
            except: ['$super', '$', 'exports', 'require', 'module', '_']
        },
        compress: {
            warnings: false
        },
        output: {
            comments: false,
        }
    }),

    /*定义变量分辨是生产还是开发环境*/
    new webpack.DefinePlugin({
        webpack_api_path: JSON.stringify(''),
    }),



]);

module.exports = webpackBuild;