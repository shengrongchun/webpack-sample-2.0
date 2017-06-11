var templateUrl = require('./template/panel.view.html');

/**
 * 导航指令
 */
angular
    .module('src.ui')
    .directive('uiPanel', function() {
        return {
            scope: {
                heading: '@',
                shadow: '=?',
                border: '=?'
            },
            controller: function($scope) {
                this.setHeading = function(element) {
                    this.heading = element;
                    $scope.heading = true;
                };
            },
            replace: true,
            transclude: true,
            templateUrl: templateUrl,
            link: function(scope, element, attrs) {
                if(angular.isDefined(scope.border) && scope.border) {
                    element.addClass('panel-border');
                }

                if(angular.isDefined(scope.shadow) && !scope.shadow) {
                    element.addClass('panel-flat');
                }
            }
        };
    })

    .directive('uiPanelHeading', function() {
        return {
            transclude: true,
            replace: true,
            require: '^uiPanel',
            link: function(scope, element, attrs, panelCtrl, transclude) {
                panelCtrl.setHeading(transclude(scope, angular.noop));
            }
        };
    })

    .directive('uiPanelTransclude', function() {
        return {
            require: '?^uiPanel',
            link: function(scope, element, attrs, controller) {
                scope.$watch(function() {
                    return controller[attrs.uiPanelTransclude];
                }, function(heading) {
                    if (heading) {
                        element.html('');
                        element.append(heading);
                    }
                });
            }
        };
    });