import templateUrl from './dropdown.view.html';

export default ($stateProvider) => {
    "ngInject";

    $stateProvider.state('components/dropdown', {
        url: '/components/dropdown',
        templateUrl: templateUrl
    });
}