'use strict';

import  templateUrl from './template/header.view.html';

/**
 * 导航指令
 */
angular
    .module('src.ui')
    .directive('uiHeader', function() {
        return {
            scope: {
                branding: '@',
            },
            controller: function($scope) {
                this.setBranding = function(element) {
                    this.branding = element;
                };
            },
            replace: true,
            transclude: true,
            templateUrl: templateUrl
        };
    })
    .directive('uiHeaderBranding', function() {
        return {
            replace: true,
            transclude: true,
            require: '^uiHeader',
            link: function(scope, element, attrs, headerCtrl, transclude) {
                headerCtrl.setBranding(transclude(scope, angular.noop));
            }
        };
    })
    .directive('uiHeaderBrandingTransclude', function() {
        return {
            require: '?^uiHeader',
            link: function(scope, element, attrs, controller) {
                scope.$watch(function() {
                    return controller[attrs.uiHeaderBrandingTransclude];
                }, function(branding) {
                    if (branding) {
                        element.html('');
                        element.append(branding);
                    }
                });
            }
        };
    });