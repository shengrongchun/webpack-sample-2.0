'use strict';

/**
 * 控制器
 */
angular.module('src.ui')
    .controller('UiAlertCtrl', function($uiModalInstance, $scope, alert) {
        "ngInject";
        
        $scope.alert = alert;
        $scope.options = angular.extend({}, {
            confirmText: "确定",
            cancelText: "取消"
        }, alert.settings);

        // 确定
        $scope.save = function() {
            $uiModalInstance.close();
        };

        $scope.savePrompt = function() {
            $uiModalInstance.close($scope.alert.content);
        };

        // 取消
        $scope.cancel = function () {
            $uiModalInstance.dismiss('cancel');
        };
    });