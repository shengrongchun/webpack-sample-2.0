import templatePopover from './template/popover.html';
import templatePopoverHtml from './template/popover-html.html';
import templatePopoverTemplate from './template/popover-template.html';

angular.module('ui.bootstrap._popover', [])

.directive('uiPopoverTemplatePopup', function() {
  return {
    restrict: 'A',
    scope: { uiTitle: '@', contentExp: '&', originScope: '&' },
    templateUrl: templatePopoverTemplate
  };
})

.directive('uiPopoverTemplate', ['$uiTooltip', function($uiTooltip) {
  return $uiTooltip('uiPopoverTemplate', 'popover', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('uiPopoverHtmlPopup', function() {
  return {
    restrict: 'A',
    scope: { contentExp: '&', uiTitle: '@' },
    templateUrl: templatePopoverHtml
  };
})

.directive('uiPopoverHtml', ['$uiTooltip', function($uiTooltip) {
  return $uiTooltip('uiPopoverHtml', 'popover', 'popover', 'click', {
    useContentExp: true
  });
}])

.directive('uiPopoverPopup', function() {
  return {
    restrict: 'A',
    scope: { uiTitle: '@', content: '@' },
    templateUrl: templatePopover
  };
})

.directive('uiPopover', ['$uiTooltip', function($uiTooltip) {
  return $uiTooltip('uiPopover', 'popover', 'popover', 'click');
}]);