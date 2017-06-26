import templateUrl from './modal.view.html';
import controller from './modal.controller';

export default ($stateProvider) => {
    "ngInject";

    $stateProvider.state('components/modal', {
        url: '/components/modal',
        templateUrl: templateUrl,
        controller: controller,
        controllerAs: 'vm',
    });
}