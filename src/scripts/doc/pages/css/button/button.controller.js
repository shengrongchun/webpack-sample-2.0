/**
 * @author: shengrongchun
 */

import style from './button.scss';

class Controller {
    constructor($rootScope) {
        "ngInject";

        // 绑定依赖
        this._$rootScope = $rootScope;

        // 绑定样式
        this.style = style;


        this.code = "<code>&lt;strong&gt;&lt;/strong&gt;</code>";
        this.directiveHtml = "<ui-hightlight code='vm.code'"+
        " language='vm.language' theme='vm.theme' />";
        this.lang = "xml";
        this.theme = "rDark"; 
        this.html = ''; 
        this.langList = wangHighLighter.getLangArray();
        this.themeList = wangHighLighter.getThemeArray();



    }


    
}

export default Controller;
