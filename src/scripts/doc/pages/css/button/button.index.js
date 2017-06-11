/**
 * 
 * @author: shengrongchun
 */

import controller from './button.controller';
import templateUrl from './button.view.html';

export default 
angular.module('doc.button',[])
    .config(($stateProvider) => {
        "ngInject";

        $stateProvider.state('css/button', {
            url: "/css/button",
            templateUrl: templateUrl,
            controller: controller,
            controllerAs: 'vm',
            reloadOnSearch: false
        });
    }).name;