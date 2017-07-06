import templateUrl from './notification.view.html';
import controller  from './notification.controller';

export default ($stateProvider) => {
    "ngInject";

    $stateProvider.state('components/notification', {
        url: '/components/notification',
        controller: controller,
        templateUrl: templateUrl
    });
}