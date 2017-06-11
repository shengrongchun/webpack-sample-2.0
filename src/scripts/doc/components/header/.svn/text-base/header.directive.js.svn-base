import templateUrl from './header.view.html';
import controller from './header.controller';

class Directive {
    constructor() {
        return {
            controller: controller,
            controllerAs: 'vm',
            replace: true,
            scope: {},
            templateUrl: templateUrl
        };
    }

    static factory() {
        return new Directive();
    }
}

export default Directive;