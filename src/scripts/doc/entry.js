import '../../styles/doc_css';

/*页面的加载*/
const dependencies = ['src.ui','ui.router'];

/*page 所有index.js引入*/
const pageModules = require.context('./pages/', true, /\.index.js$/);
pageModules.keys().forEach((key) => {
    dependencies.push(pageModules(key).default);
});

/*components 所有index.js引入*/
const componentsModules = require.context('./components/', true, /\.index.js$/);
componentsModules.keys().forEach((key) => {
    dependencies.push(componentsModules(key).default);
});

/*创建应用*/
const app = angular.module('doc' , dependencies);

/*注册应用*/
angular.bootstrap(document.body, [app.name]);