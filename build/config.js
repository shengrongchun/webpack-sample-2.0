import path from 'path';

//根目录名
const src_dirname = 'src';

//根目录入口文件名
const index_file = 'entry.js';

//发布目录名
const dist_dirname = 'dist';

//服务主机名
const host = 'localhost';

//端口
const port = 8888;

//路径
const base_path = path.join(__dirname,'../');
const src_path = path.join(base_path, src_dirname);
const dist_path = path.join(base_path, dist_dirname);

//
const config = {
    //node_modules目录
    node_modules: path.join(base_path, 'node_modules'),

    //根目录名
    src_dirname: src_dirname,

    //根目录入口文件名
    index_file: index_file,

    //发布目录名
    dist_dirname: dist_dirname,

    //基本路径
    base_path: base_path,
    
    //开发路径
    src_path: src_path,

    //发布路径
    dist_path: dist_path,

    //服务启动端口
    host_port: port,

    //服务名
    host_name: host,


    //框架集合
    framework_js: ['jquery','angular'],

    //ui 组件库集合,基于bootstrap
    src_ui_js: [

    /*高亮 start*/
        'monokai_sublime_css',
        'highlight.js',
    /*高亮 end*/

        'angular-bootstrap','bootstrap_css','fontawesome_css', path.resolve(src_path+'/scripts/components', index_file)],

    //主入口集合
    app_js: ['angular-ui-router', path.resolve(src_path+'/scripts/doc', index_file)],

    //引入顺序
    include_order: {'vendor':0,'framework_js':1,'src_ui_js':2,'app':3},


    //增加css 各浏览器前缀，适应指定浏览器
    prefix_css_list: ['> 1%', 'ie > 6', 'Firefox > 20'],




};
export default config;