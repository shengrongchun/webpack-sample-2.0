import '../../styles/src_ui_css';


/*页面的加载*/
const dependencies = [

    'ui.bootstrap',
    'ui.bootstrap._tabs',
    'ui.bootstrap._accordion',
    'ui.bootstrap._dropdown',
    'ui.bootstrap._modal'

    ];


/*创建应用*/
angular.module('src.ui' , dependencies);

/*bootstrap_ui 所有index.js引入*/
const amazeUiModules = require.context('./bootstrap_ui/', true, /\.index.js$/);
amazeUiModules.keys().forEach(amazeUiModules);

/*src_ui 所有index.js引入*/
const srcUiModules = require.context('./src_ui/', true, /\.index.js$/);
srcUiModules.keys().forEach(srcUiModules);

