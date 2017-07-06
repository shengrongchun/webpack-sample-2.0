import templateUrl from './panel.view.html';

export default ($stateProvider) => {
    "ngInject";

    $stateProvider.state('components/panel', {
        url: '/components/panel',
        templateUrl: templateUrl
    });
}