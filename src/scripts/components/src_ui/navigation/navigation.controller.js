'use strict';

/**
 * 导航 (控制器)
 */
angular.module('src.ui')
    .controller('uiNavigationCtrl', function($scope, $location) {
        "ngInject";
        
        $scope.$watch(function() {
            return $location.path();
        }, function() {
            // 获取当前url
            $scope.currentUrl = '#' + $location.path();
        });
    });