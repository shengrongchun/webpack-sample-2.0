/**
 * @author: shengrongchun
 */

import style from './main.scss';
import loginSliderImg from './images/logo_big.png';

class Controller {
    constructor($rootScope) {
        "ngInject";

        // 绑定依赖
        this._$rootScope = $rootScope;
        //this._$sessionStorage = $sessionStorage;//之后一定要了解
        //this._$state = $state;//之后一定要了解

        // 绑定样式
        this.style = style;

        // 绑定图片
        this.loginSliderImg = loginSliderImg;

        this.aaa = "hello webpack";
    }

    /**
     * 用户登录
     */
    main() {
        // this._resetStatus();
        // this._MainUser.login(this.credentials).then(data => {
        //     this._$rootScope.CURR_USER = data.data;
        //     this._$state.go('main/post');
        // }).catch(data => {
        //     if (data.resultCode === '401') {
        //         this.credentials.status.wrongPw = true;
        //     }
        // });
    }

}

export default Controller;
