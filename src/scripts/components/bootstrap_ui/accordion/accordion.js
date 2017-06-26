import groupTemplateUrl  from './template/accordion-group.view.html';
import accordionTemplateUrl  from './template/accordion.view.html';

angular.module('ui.bootstrap._accordion',['ui.bootstrap._collapse'])
    .constant('accordionConfig', {
      closeOthers: true
    })

    .controller('UiAccordionController', ['$scope', '$attrs', 'accordionConfig', function ($scope, $attrs, accordionConfig) {

        this.icon = $attrs.icon;
        this.iconPosition = $attrs.iconPosition;

        // This array keeps track of the accordion groups
        this.groups = [];

        // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
        this.closeOthers = function(openGroup) {
            var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
            if ( closeOthers ) {
              angular.forEach(this.groups, function (group) {
                if ( group !== openGroup ) {
                  group.isOpen = false;
                }
              });
            }
        };

        // This is called from the accordion-group directive to add itself to the accordion
        this.addGroup = function(groupScope) {
            var that = this;
            this.groups.push(groupScope);

            groupScope.$on('$destroy', function (event) {
              that.removeGroup(groupScope);
            });
        };

        // This is called from the accordion-group directive when to remove itself
        this.removeGroup = function(group) {
            var index = this.groups.indexOf(group);
            if ( index !== -1 ) {
              this.groups.splice(index, 1);
            }
        };

    }])

    .directive('uiAccordionGroup', function () {
        return {
            restrict:'EA',
            controller:'UiAccordionController',
            transclude: true,
            replace: true,
            templateUrl: function(element, attrs) {
                return attrs.templateUrl || groupTemplateUrl;
            },
        };
    })

    // The accordion-group directive indicates a block of html that will expand and collapse in an accordion
    .directive('uiAccordion', function() {
        return {
            require:'^uiAccordionGroup',         // We need this directive to be inside an accordion
            restrict:'EA',
            transclude:true,              // It transcludes the contents of the directive into the template
            replace: true,                // The element containing the directive will be replaced with the template
            templateUrl: function(element, attrs) {
                return attrs.templateUrl || accordionTemplateUrl;
            },
            scope: {
               heading: '@',               // Interpolate the heading attribute onto this scope
               isOpen: '=?',
               isDisabled: '=?',
            },
            controller: function($scope) {
                this.setHeading = function(element) {
                    this.heading = element;
                };
            },
            link: function(scope, element, attrs, accordionCtrl) {

                scope.icon = accordionCtrl.icon;
                scope.iconPosition = accordionCtrl.iconPosition;

                accordionCtrl.addGroup(scope);

                scope.$watch('isOpen', function(value) {
                    if ( value ) {
                      accordionCtrl.closeOthers(scope);
                    }
                });

                scope.toggleOpen = function() {
                    if ( !scope.isDisabled ) {
                      scope.isOpen = !scope.isOpen;
                    }
                };
            }
        };
    })
 
    .directive('uiAccordionHeading', function() {
        return {
            restrict: 'EA',
            require: '^uiAccordion',
            transclude: true,
            replace: true,
            template: '',
            link: function(scope, element, attrs, accordionGroupCtrl, transclude) {
                accordionGroupCtrl.setHeading(transclude(scope, angular.noop));
            }
        }
    })

    .directive('uiTranscludeHeading', function() {
        return {
            restrict: 'EA',
            require: '^uiAccordion',
            link: function(scope, element, attrs, accordionGroupCtrl) {
                scope.$watch(function() {return accordionGroupCtrl[attrs.uiTranscludeHeading]}, function(heading) {
                    
                    if (heading) {
                        element.find('span').html('');
                        element.find('span').html(heading);
                    }
                });
            }

        }
    })
    
