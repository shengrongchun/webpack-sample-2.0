import templateUrl from './popover.view.html';
import controller  from './popover.controller';

export default ($stateProvider) => {
    "ngInject";

    $stateProvider.state('components/popover', {
        url: '/components/popover',
        controller: controller,
        controllerAs: 'vm',
        templateUrl: templateUrl
    });
}