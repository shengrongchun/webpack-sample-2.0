class Controller {
    constructor($scope, $timeout, uiNotification, uiAlert) {
        "ngInject";
        

        $scope.options = {
            title: "通知标题",
            message: "通知内容：演示文本信息。",
           
            positionX:  "right",
            positionY : "bottom",
            closeOnClick: true,
            //maxCount: 0,
            
            delay: 5000,
            onClose: undefined,



            //辅助参数
            closeOnClickFlag: "t",
            method: "primary"
        };

        var _setCloseOnClick = function() {
            if($scope.options.closeOnClickFlag == "t") { 
                $scope.options.closeOnClick = true;
            }else {
                $scope.options.closeOnClick = false;
            }
        };

        $scope.notify = function() {
            _setCloseOnClick();
            switch($scope.options.method) {
                case "primary":
                    uiNotification.primary($scope.options);
                    break;
                case "info":
                    uiNotification.info($scope.options);
                    break;
                case "success":
                    uiNotification.success($scope.options);
                    break;
                case "warning":
                    uiNotification.warning($scope.options);
                    break;
                case "error":
                    uiNotification.error($scope.options);
                    break;
            }
        };

        $scope.onClose = function() {
            $scope.options.onClose = function() {
                uiAlert.success('回调成功！');
                $scope.options.onClose = undefined;
            }
        };
        
        var promise;
        $scope.setDelayFalse = function() {
            $scope.options.delay = false;
            promise = uiNotification.primary($scope.options);
        };

        $scope.clear = function() {
            uiNotification.clear(promise);
        };
        $scope.clearAll = function() {
            uiNotification.clearAll();
        };
    }
}

export default Controller;