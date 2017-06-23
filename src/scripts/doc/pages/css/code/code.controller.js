/**
 * @author: shengrongchun
 */

import style from './code.scss';

class Controller {
    constructor() {
        "ngInject";

        /*外部style引入绑定*/
        this.style = style; 
        
    }
    
    //点击事件
    onClick() {
        alert("hello");
    }

    
}

export default Controller;
