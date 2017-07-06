import templateUrl from './template/alert.view.html';

angular
    .module('src.ui')
    .provider('uiAlert', function() {
        
        this.options = {
            templateUrl: templateUrl,
            controller: 'UiAlertCtrl'
        };

        this.$get = function($uiModal) {
            var options = this.options;

            var confirm = function(title, settings) {
                var modalInstance = _open('confirm', title, 'alert-dialog', settings);
                return modalInstance.result;
            };

            var info = function(title, settings) {
                var modalInstance = _open('info', title, 'alert-dialog alert-dialog-with-icon', settings);
                return modalInstance.result;
            };

            var success = function(title, settings) {
                var modalInstance = _open('success', title, 'alert-dialog alert-dialog-with-icon', settings);
                return modalInstance.result;
            };

            var warning = function(title, settings) {
                var modalInstance = _open('warning', title, 'alert-dialog alert-dialog-with-icon', settings);
                return modalInstance.result;
            };

            var error = function(title, settings) {
                var modalInstance = _open('error', title, 'alert-dialog alert-dialog-with-icon', settings);
                return modalInstance.result;
            };

            var prompt = function(title, settings) {
                var modalInstance = _open('prompt', title, 'alert-dialog alert-dialog-with-icon', settings);
                return modalInstance.result;
            };

            var _open = function(type, title, className, settings) {
                var _className = settings&&settings.windowClass ? settings.windowClass : '';
                var _options = angular.extend({}, settings, {
                    templateUrl: options.templateUrl,
                    controller: options.controller,
                    windowClass: className + ' ' + _className,
                    resolve: {
                        alert: function() {
                            return {
                                type: type,
                                title: title,
                                settings: settings
                            };
                        }
                    }
                });

                var modalInstance = $uiModal.open(_options);
                return modalInstance;
            }

            return {
                confirm: confirm,
                info: info,
                success: success,
                warning: warning,
                error: error,
                prompt: prompt
            };
        };
    });