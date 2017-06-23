
import webpack from 'webpack';
//
import path from 'path';
//installed via npm
import HtmlWebpackPlugin from 'html-webpack-plugin'; 

//抽取单独文件
import ExtractTextPlugin  from 'extract-text-webpack-plugin';

//配置参数
import config from './config';


const webpackCommon = {
    //入口
    entry: {
        framework_js: config.framework_js,
        src_ui_js: config.src_ui_js,
        app: config.app_js,

    },


    //模块
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/, 
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'ng-annotate-loader'
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            compact: false
                        }
                    }
                ]
            },
            {
                test:/\.scss$/,
                include: [path.resolve(config.src_path, './styles')], 
                use: ExtractTextPlugin.extract(
                {
                    fallback: 'style-loader',
                    use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'autoprefixer-loader',
                        options: {
                            browsers: config.prefix_css_list
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [ config.src_path + '/styles' ],
                        }
                    }],
                    publicPath: '../',
                })
            },
            {
                test:/\.scss$/,
                exclude: [path.resolve(config.src_path, './styles')], 
                use: ExtractTextPlugin.extract(
                {
                    fallback: 'style-loader',
                    use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,//模块化，产生hash类
                            sourceMap: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]',//定制hash

                        }
                    },
                    {
                        loader: 'autoprefixer-loader',
                        options: {
                            browsers: config.prefix_css_list
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            //includePaths: [ config.src_path + '/styles' ],
                        }
                    }],
                    publicPath: '../',
                })
            },
            {
                test:/\.css$/,  
                use: ExtractTextPlugin.extract(
                {
                    fallback: 'style-loader',
                    use: [
                    {
                        loader: 'css-loader'
                    },{
                        loader: 'autoprefixer-loader',
                        options: {
                            browsers: config.prefix_css_list
                        }
                    }],
                    publicPath: '../',
                })
            }, 
            {
                test: /\.html$/,
                exclude: /index.html/,
                use: [
                    {   //初始化模板缓存
                        loader: 'ngtemplate-loader?relativeTo=' + config.src_path + '/'
                    },
                    {
                        loader: 'html-loader?attrs=false',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: 'url-loader?name=images/[name]_[hash:base64:5].[ext]'
            }, 
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader?name=fonts/[name].[ext]&prefix=fonts',
            }
            // ,
            // {
            //     test: require.resolve("jquery"),
            //     use: 'expose-loader?$!expose-loader?jquery!expose-loader?jQuery'
            // }
        ]
    },

    //插件
    plugins: [

        //html 模板插件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(config.src_path, 'index.html'),
            inject: 'body',
            hash: false,
            chunksSortMode: (a, b) => {
                //
                if(config.include_order[b.names[0]] < config.include_order[a.names[0]]) {
                    return true;//返回true时,b比a先引入，反之，a先引入
                }else {
                    return false;
                }
            }

        }),

        //css抽取文件
        new ExtractTextPlugin({
            filename: 'styles/[name]_[chunkhash:8].min.css',
            disable: false,
            allChunks: true
        }),

        /**
         * 合并公用代码
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module, count) =>  {
                return module.resource && module.resource.indexOf(config.src_path) === -1;
            }
        }),

        /*jquery 引入jquery，申明全局,和148行作用一致*/
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
            'hljs': 'highlight.js',

        })

    ],

    //别名，后缀
    resolve: {
        //别名
        alias: {

            /*bootstrapui 样式引入*/
            bootstrap_css: path.resolve(config.node_modules, './bootstrap/dist/css/bootstrap.css'),
            /*字体 样式引入*/
            fontawesome_css: path.resolve(config.node_modules, './font-awesome/css/font-awesome.css'),


            /*高亮 start*/
            monokai_sublime_css: path.resolve(config.node_modules, './highlight.js/styles/monokai-sublime.css'),
            /*高亮 end*/
        },

        //自定添加后缀，默认如果不写是：extensions: ['.js','.json'],webpack 2.0 不需传''
        extensions: ['.js', '.json', '.css', '.scss'],

        //模块指定引入目录，默认不写:为node_modules
        modules: ['node_modules'],

    },

    //现在 jquery= angular.element,一般对于<script>引入文件
    // externals:{
    //     jquery:'angular.element',
    //     jQuery:'angular.element',
    //     $:'angular.element',
    // }

  

}
//
export default webpackCommon;

