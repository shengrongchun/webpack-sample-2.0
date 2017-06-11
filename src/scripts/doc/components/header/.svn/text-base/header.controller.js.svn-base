class Controller {
    constructor($scope, $location) {
        "ngInject";

        this.$scope = $scope;
        this.$location = $location;

        this.watch();
    }

    watch() {
        this.$scope.$watch(() => {
            return this.$location.path();
        }, () => {
            let path = this.$location.path();
            let pathList = path.split('/');
            if (pathList.length > 1) {
                this.currentPath = pathList[1];
            }
        });
    }
}

export default Controller;