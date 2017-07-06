import templateUrl from './alert.view.html';
import controller  from './alert.controller';

export default ($stateProvider) => {
    "ngInject";

    $stateProvider.state('components/alert', {
        url: '/components/alert',
        controller: controller,
        controllerAs: 'vm',
        templateUrl: templateUrl
    });
}