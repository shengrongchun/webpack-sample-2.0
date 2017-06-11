import directive from './header.directive';

export default
angular.module('doc.header', [])
       .directive('suiHeader', directive.factory)
       .name;