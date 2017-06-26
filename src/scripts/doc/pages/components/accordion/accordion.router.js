import templateUrl from './accordion.view.html';

export default ($stateProvider) => {
    "ngInject";

    $stateProvider.state('components/accordion', {
        url: '/components/accordion',
        templateUrl: templateUrl
    });
}