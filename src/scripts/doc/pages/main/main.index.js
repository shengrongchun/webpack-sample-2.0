/**
 * main
 * @author: shengrongchun
 */

import controller from './main.controller';
import templateUrl from './main.view.html';

export default 
angular.module('doc.main',[])
    .config(($stateProvider, $urlRouterProvider) => {
        "ngInject";

        $urlRouterProvider.otherwise('/main');

        $stateProvider.state('main', {
            url: "/main",
            templateUrl: templateUrl,
            controller: controller,
            controllerAs: 'vm',
            reloadOnSearch: false
        });
    }).name;