import templateUrl from './tooltip.view.html';
import controller  from './tooltip.controller';

export default ($stateProvider) => {
    "ngInject";

    $stateProvider.state('components/tooltip', {
        url: '/components/tooltip',
        controller: controller,
        controllerAs: 'vm',
        templateUrl: templateUrl
    });
}