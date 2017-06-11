import directive from './hightlight.directive';

export default
angular.module('src.ui')
       .directive('uiHightlight', directive.factory)
       .name;