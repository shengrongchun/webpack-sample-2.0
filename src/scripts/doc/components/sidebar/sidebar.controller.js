class Controller {
    constructor(SidebarService, $rootScope, $scope, $location) {
        "ngInject";
        
        $scope.$watch(() => {
            return $location.path();
        }, () => {
            var path = $location.path().split('/');
            if(!path[1]) {
                path[1] = 'main';
            }

            if($rootScope.currentNav != path[1]) {
                $rootScope.currentNav = path[1];
                SidebarService.get(path[1]).then((data) => {
                    $scope.links = data.data.records;
                });
            }
        });
    }
}

export default Controller;