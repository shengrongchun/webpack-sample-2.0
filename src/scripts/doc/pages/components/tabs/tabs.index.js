/**
 * 
 * @author: shengrongchun
 */

import controller from './tabs.controller';
import templateUrl from './tabs.view.html';

export default 
angular.module('doc.tabs',[])
    .config(($stateProvider) => {
        "ngInject";

        $stateProvider.state('components/tabs', {
            url: "/components/tabs",
            templateUrl: templateUrl,
            controller: controller,
            controllerAs: 'vm',
            reloadOnSearch: false
        });
    }).name;