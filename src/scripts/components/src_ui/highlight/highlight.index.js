import directive from './highlight.directive';

export default
angular.module('src.ui')
       .directive('uiHighlight', directive.factory)
       .name;