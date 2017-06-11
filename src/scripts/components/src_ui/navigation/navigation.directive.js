import templateUrl from './template/navigation.view.html'

/**
 * 导航指令
 */
angular
    .module('src.ui')
    .directive('uiNavigation', ($timeout) => {
        "ngInject";
        
        return {
            replace: true,
            templateUrl: (element, attrs) => {
                return attrs.templateUrl || templateUrl;
            },
            link: link,
            controller: 'uiNavigationCtrl',
            scope: {
                links: '='
            }
        };
        
        function link(scope, element, attrs) {
            scope.type = attrs.type ? attrs.type : 'navigation-verticle-1';
           
            if(scope.type.indexOf('verticle') !== -1) {
                element.delegate('li', 'click', function(e) {
                    var $this = angular.element(this);
                    var $toCloseItems;
                    if($this.hasClass('collapsed')) {  
                        var children = $this.find('> ul > li');
                        var ulHeight = 10; // ul上下padding的和
                        angular.forEach(children, function(obj, index){
                            ulHeight += obj.clientHeight;
                        });
                        $toCloseItems = $this.siblings('li.expanded');
                        $this.addClass('expanded').removeClass('collapsed').find('> ul').height(ulHeight);
                        var $ul = angular.element(this).find('> ul');
                        
                        $timeout(function() {
                            $ul.height('auto');
                        }, 200);
                    } else if($this.hasClass('expanded')) {
                        // 关闭当前展开的菜单项
                        $toCloseItems = $this;
                    }
                    
                    angular.forEach($toCloseItems, function(item) {
                        var $item = angular.element(item);
                        var $itemUl = $item.find('> ul');
                        $item.removeClass('expanded').addClass('collapsed');
                        $itemUl.height($itemUl.height()).height(0);
                    });

                    e.stopPropagation();
                });

                scope.$watch('links', function() {
                    if(scope.links) {
                        $timeout(function() {
                            var activedLink = element.find('li.active');
                            activedLink.parents('.link-root').trigger('click');
                        }, 0);
                    }
                });
            } else {
                element.delegate('li', 'mouseenter', function() {
                    var child = angular.element(this).find('> ul');
                    if(child.length > 0) {
                        child.fadeIn(100);
                    }
                });

                element.delegate('li', 'mouseleave', function() {
                    var child = angular.element(this).find('> ul');
                    if(child.length > 0) {
                        child.fadeOut(100);
                    }
                });

                scope.$watch('links', function() {
                    $timeout(function() {
                        var activedLink = element.find('li.active');
                        activedLink.parents('li').last().addClass('active');
                    }, 200);
                });
            }
        }
        
    });