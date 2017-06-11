import directive from './sidebar.directive';
import service   from './sidebar.service';

export default
angular.module('doc.sidebar', [])
       .service('SidebarService', service)
       .directive('suiSidebar', directive.factory)
       .name;