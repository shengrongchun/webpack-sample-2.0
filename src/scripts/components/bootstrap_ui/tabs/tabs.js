import templateUrlTabset from './template/tabset.view.html';
import templateUrlTab from './template/tab.view.html';


angular.module('ui.bootstrap._tabs',[])
    .controller('UiTabsetController', ['$scope', function($scope) {
        var ctrl = this,
            tabs = ctrl.tabs = $scope.tabs = [];

        ctrl.select = function(selectedTab) {
            angular.forEach(tabs, function(tab) {
                if (tab.active && tab !== selectedTab) {
                    tab.active = false;
                    tab.onDeselect();
                    selectedTab.selectCalled = false;
                }
            });
            selectedTab.active = true;
            // only call select if it has not already been called
            if (!selectedTab.selectCalled) {
                selectedTab.onSelect();
                selectedTab.selectCalled = true;
            }
        };

        ctrl.addTab = function addTab(tab) {
            tabs.push(tab);
            // we can't run the select function on the first tab
            // since that would select it twice
            if (tabs.length === 1 && tab.active !== false) {
                tab.active = true;
            } else if (tab.active) {
                ctrl.select(tab);
            } else if($scope.activeId && $scope.activeId == tab.tabId) {
                ctrl.select(tab);
            } else {
                tab.active = false;
            }
        };

        ctrl.removeTab = function removeTab(tab) {
            var index = tabs.indexOf(tab);
            //Select a new tab if the tab to be removed is selected and not destroyed
            if (tab.active && tabs.length > 1 && !destroyed) {
                //If this is the last tab, select the previous tab. else, the next tab.
                var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
                ctrl.select(tabs[newActiveIndex]);
            }
            tabs.splice(index, 1);
        };


        var destroyed;
        $scope.$on('$destroy', function() {
            destroyed = true;
        });

    }])

    .directive('uiTabset', function($timeout, $window) {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            scope: {
                type: '@',
                activeId: '='
            },
            controller: 'UiTabsetController',
            templateUrl: templateUrlTabset,
            link: function(scope, element, attrs) {
                scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
                scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
                scope.size = angular.isDefined(attrs.size) ? attrs.size : 'md';

  
            }
        };
    })

    .directive('uiTab', ['$parse', function($parse) {
        return {
            require: '^uiTabset',
            restrict: 'EA',
            replace: true,
            templateUrl: templateUrlTab,
            transclude: true,
            scope: {
                active: '=?',
                heading: '@',
                tabId: '@',
                onSelect: '&select', //This callback is called in contentHeadingTransclude
                //once it inserts the tab's content into the dom
                onDeselect: '&deselect'
            },
            controller: function() {
                //Empty controller so other directives can require being 'under' a tab
            },
            link: function(scope, elm, attrs, tabsetCtrl, transclude) {
                scope.$watch('active', function(active) {
                    if (active) {
                        tabsetCtrl.select(scope);
                    }
                });

                scope.disabled = false;
                if (attrs.disable) {
                    scope.$parent.$watch($parse(attrs.disable), function(value) {
                        scope.disabled = !!value;
                    });
                }

                scope.select = function() {
                    if (!scope.disabled) {
                        scope.active = true;
                    }
                };

                tabsetCtrl.addTab(scope);
                scope.$on('$destroy', function() {
                    tabsetCtrl.removeTab(scope);
                });

                //We need to transclude later, once the content container is ready.
                //when this link happens, we're inside a tab heading.
                scope.$transcludeFn = transclude;

            }
        };
    }])

    .directive('uiTabHeadingTransclude', function() {
        return {
            restrict: 'A',
            require: ['?^uiTab', '?^tab'], // TODO: change to '^uibTab' after deprecation removal
            link: function(scope, elm) {
                scope.$watch('headingElement', function updateHeadingElement(heading) {
                    if (heading) {
                        elm.html('');
                        elm.append(heading);
                    }
                });
            }
        };
    })

    .directive('uiTabContentTransclude', function() {
        return {
            restrict: 'A',
            require: ['?^uiTabset', '?^tabset'], // TODO: change to '^uibTabset' after deprecation removal
            link: function(scope, elm, attrs) {
                var tab = scope.$eval(attrs.uiTabContentTransclude);

                //Now our tab is ready to be transcluded: both the tab heading area
                //and the tab content area are loaded.  Transclude 'em both.
                tab.$transcludeFn(tab.$parent, function(contents) {
                    angular.forEach(contents, function(node) {
                        if (isTabHeading(node)) {
                            //Let tabHeadingTransclude know.
                            tab.headingElement = node;
                        } else {
                            elm.append(node);
                        }
                    });
                });
            }
        };

        function isTabHeading(node) {
            return node.tagName && (
                node.hasAttribute('tab-heading') || // TODO: remove after deprecation removal
                node.hasAttribute('data-tab-heading') || // TODO: remove after deprecation removal
                node.hasAttribute('x-tab-heading') || // TODO: remove after deprecation removal
                node.hasAttribute('ui-tab-heading') ||
                node.hasAttribute('data-ui-tab-heading') ||
                node.hasAttribute('x-ui-tab-heading') ||
                node.tagName.toLowerCase() === 'tab-heading' || // TODO: remove after deprecation removal
                node.tagName.toLowerCase() === 'data-tab-heading' || // TODO: remove after deprecation removal
                node.tagName.toLowerCase() === 'x-tab-heading' || // TODO: remove after deprecation removal
                node.tagName.toLowerCase() === 'ui-tab-heading' ||
                node.tagName.toLowerCase() === 'data-ui-tab-heading' ||
                node.tagName.toLowerCase() === 'x-ui-tab-heading'
            );
        }
    });