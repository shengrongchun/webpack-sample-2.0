/**
 * 
 * @author: shengrongchun
 */

import controller from './table.controller';
import templateUrl from './table.view.html';

export default 
angular.module('doc.table',[])
    .config(($stateProvider) => {
        "ngInject";

        $stateProvider.state('css/table', {
            url: "/css/table",
            templateUrl: templateUrl,
            controller: controller,
            controllerAs: 'vm',
            reloadOnSearch: false
        });
    }).name;