'use strict';

angular.module('ui.bootstrap._dropdown',[])
    .directive('uiDropdown', function() {
        return {
            controller: 'UibDropdownController',
            link: function(scope, element, attrs, dropdownCtrl) {
                dropdownCtrl.init();
            }
        };
    })

    .directive('uiDropdownMenu', function() {
        return {
            restrict: 'AC',
            require: '?^uiDropdown',
            link: function(scope, element, attrs, dropdownCtrl) {
                if (!dropdownCtrl || angular.isDefined(attrs.dropdownNested)) {
                    return;
                }

                element.addClass('dropdown-menu');

                var tplUrl = attrs.templateUrl;
                if (tplUrl) {
                    dropdownCtrl.dropdownMenuTemplateUrl = tplUrl;
                }

                if (!dropdownCtrl.dropdownMenu) {
                    dropdownCtrl.dropdownMenu = element;
                }
            }
        };
    })

    .directive('uiKeyboardNav', function() {
        return {
            restrict: 'A',
            require: '?^uiDropdown',
            link: function(scope, element, attrs, dropdownCtrl) {
                element.bind('keydown', function(e) {
                    if ([38, 40].indexOf(e.which) !== -1) {
                        e.preventDefault();
                        e.stopPropagation();

                        var elems = dropdownCtrl.dropdownMenu.find('a');

                        switch (e.which) {
                            case (40):
                                { // Down
                                    if (!angular.isNumber(dropdownCtrl.selectedOption)) {
                                        dropdownCtrl.selectedOption = 0;
                                    } else {
                                        dropdownCtrl.selectedOption = dropdownCtrl.selectedOption === elems.length - 1 ?
                                            dropdownCtrl.selectedOption : dropdownCtrl.selectedOption + 1;
                                    }
                                    break;
                                }
                            case (38):
                                { // Up
                                    if (!angular.isNumber(dropdownCtrl.selectedOption)) {
                                        dropdownCtrl.selectedOption = elems.length - 1;
                                    } else {
                                        dropdownCtrl.selectedOption = dropdownCtrl.selectedOption === 0 ?
                                            0 : dropdownCtrl.selectedOption - 1;
                                    }
                                    break;
                                }
                        }
                        elems[dropdownCtrl.selectedOption].focus();
                    }
                });
            }
        };
    })

    .directive('uiDropdownToggle', function() {
        return {
            require: '?^uiDropdown',
            link: function(scope, element, attrs, dropdownCtrl) {
                if (!dropdownCtrl) {
                    return;
                }

                element.addClass('dropdown-toggle');

                dropdownCtrl.toggleElement = element;

                var toggleDropdown = function(event) {
                    event.preventDefault();

                    if (!element.hasClass('disabled') && !attrs.disabled) {
                        scope.$apply(function() {
                            dropdownCtrl.toggle();
                        });
                    }
                };

                element.bind('click', toggleDropdown);

                // WAI-ARIA
                element.attr({
                    'aria-haspopup': true,
                    'aria-expanded': false
                });
                scope.$watch(dropdownCtrl.isOpen, function(isOpen) {
                    element.attr('aria-expanded', !!isOpen);
                });

                scope.$on('$destroy', function() {
                    element.unbind('click', toggleDropdown);
                });
            }
        };
    });