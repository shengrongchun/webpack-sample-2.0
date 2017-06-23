/**
 * @author: shengrongchun
 */

import style from './table.scss';

class Controller {
    constructor() {
        "ngInject";

        /*外部style引入绑定*/
        this.style = style; 

        /*高亮设置*/
        this.lang = "xml";
        this.theme = "rDark"; 

        
    }
    

    
}

export default Controller;
