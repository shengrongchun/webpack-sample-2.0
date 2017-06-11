'use strict';

/**
 * Header(控制器)
 */
angular.module('src.ui')
    .controller('uiHeaderCtrl', ($scope, $location) => {
        "ngInject"
        
        $scope.$watch(() => {

            return $location.path();

        }, () => {

            const path = $location.path();
            const pathList = path.split('/');

            if (pathList.length > 1) {
                $scope.currentPath = pathList[1];
            }

        });

    });