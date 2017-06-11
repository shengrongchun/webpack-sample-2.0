/**
 * @author: shengrongchun
 */

import style from './code.scss';

class Controller {
    constructor($rootScope) {
        "ngInject";

        // 绑定依赖
        this._$rootScope = $rootScope;

        // 绑定样式
        this.style = style;

        //this.onClick = onClick;
        
    }

    //点击事件
    onClick() {
        $('#my-prompt').modal({
            relatedTarget: this,
            onConfirm: function(e) {
                alert('你输入的是：' + e.data || '')
            },
            onCancel: function(e) {
                alert('不想说!');
            } 
        });
    }

    
}

export default Controller;
