/**
 * @author: shengrongchun
 */

import style from './tabs.scss';

class Controller {
    constructor($rootScope) {
        "ngInject";

        // 绑定依赖
        this._$rootScope = $rootScope;

        // 绑定样式
        this.style = style;



    }


    
}

export default Controller;
