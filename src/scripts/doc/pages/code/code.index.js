/**
 * 
 * @author: shengrongchun
 */

import controller from './code.controller';
import templateUrl from './code.view.html';

export default 
angular.module('doc.code',[])
    .config(($stateProvider) => {
        "ngInject";

        $stateProvider.state('code', {
            url: "/code",
            templateUrl: templateUrl,
            controller: controller,
            controllerAs: 'vm',
            reloadOnSearch: false
        });
    }).name;