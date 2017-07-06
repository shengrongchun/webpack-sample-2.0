import templateUrl from './template/notification.view.html';

angular.module('src.ui')
    .provider('uiNotification',function() {
        
        this.options = {
            spance: 10,
            delay: 5000,
            templateUrl: templateUrl,
            positionX: 'right',
            positionY: 'bottom',
        }

        this.$get = function($http, $templateCache, $compile, $rootScope, $sce, $timeout, $q) {
            "ngInject";

            var messageArrays = [];
            var spance = this.options.spance;
            var delay = this.options.delay;
            var templateUrl = this.options.templateUrl;
            var positionX = this.options.positionX;
            var positionY = this.options.positionY;

            var notify = function(args, type) {
                var deferred = $q.defer();

                args.scope = args.scope ? args.scope : $rootScope;
                args.template = args.templateUrl ? args.templateUrl : templateUrl;
                args.delay = !angular.isUndefined(args.delay) ? args.delay : delay;
                args.positionY = args.positionY ? args.positionY : positionY;
                args.positionX = args.positionX ? args.positionX : positionX;
                //
                if(typeof args !== 'object') {
                    args = {message: args};
                }

                /*用$templateCache设置缓存，只请求一次，下次直接使用缓存*/
                $http.get(args.template, { cache: $templateCache }).then(function(template) {

                    /*创建一个scope,集成与$rootScope，避免污染$rootScope*/
                    var scope = args.scope.$new();
                        /*直接写并不安全，angular是不允许绑定的,$sce转换成安全类型*/
                        scope.title = $sce.trustAsHtml(args.title);
                        scope.message = $sce.trustAsHtml(args.message);

                    var templateElement = $compile(template.data)(scope);   
                    angular.element(document.getElementsByTagName('body')).append(templateElement);
                    //
                    $timeout(function() {
                        //设置类型
                        if(type) {
                            templateElement.addClass(type);
                        }
                        //设置位置
                        if(args.positionX == 'center') {
                            templateElement.css('left', parseInt(window.innerWidth/ 2 - templateElement.width()/ 2) + 'px');
                        }else {
                            templateElement.css(args.positionX,spance+'px');  
                        }
                        
                        templateElement.css(args.positionY,'-'+templateElement.height()+'px');
                        
                        //重设每个message位置
                        var bottomPx = 0;
                        var resetPosition = function(eleHeight, num) {
                            for(var i=0;i<num;i++) {
                                bottomPx = parseInt(messageArrays[i].css(args.positionY).substr(0,messageArrays[i].css(args.positionY).length-2))+spance+eleHeight;
                                messageArrays[i].css(args.positionY,bottomPx+'px');   
                            }
                        }
                        
                        resetPosition(templateElement.height(),messageArrays.length);
                        templateElement.css(args.positionY,spance+'px');

                        messageArrays.push(templateElement);



                        //关闭事件
                        scope.clickToClose = function() {
                            resetPosition(-(templateElement.height()+spance*2),messageArrays.indexOf(templateElement));
                            messageArrays.splice(messageArrays.indexOf(templateElement), 1);
                            //
                            if(args.onClose && typeof args.onClose == 'function') {
                                args.onClose(templateElement);
                            }
                            templateElement.remove();
                            scope.$destroy();
                        }
                        //元素绑定click事件
                        if(args.closeOnClick) {
                            templateElement.addClass('click-to-close');
                            templateElement.bind('click',scope.clickToClose);
                        }

                        //延时关闭
                        if(args.delay && args.delay !='false' && angular.isNumber(parseInt(args.delay))) {
                            var promise = $timeout(function() {
                                templateElement.addClass('killed');
                                $timeout(scope.clickToClose,900);
                            },args.delay);

                            //鼠标进入,离开事件绑定
                            templateElement.bind('mouseenter',function() {
                                $timeout.cancel(promise);
                            });
                            templateElement.bind('mouseleave',function() {
                                templateElement.addClass('killed');
                                $timeout(scope.clickToClose,900);
                            });
                        }

                        

                    });

                    return deferred.resolve(scope);  

                }, function(error) {
                    throw new Error('uiNotification Template (' + args.template + ') could not be loaded. ' + error);
                });

                return deferred.promise;
            };


            notify.primary = function(args) {
                return notify(args,'primary');
            }
            notify.info = function(args) {
                return notify(args,'info');
            }
            notify.success = function(args) {
                return notify(args,'success');
            }
            notify.error = function(args) {
                return notify(args,'error');
            }
            notify.warning = function(args) {
                return notify(args,'warning');
            }
            notify.clear = function(promise) {
                promise.then(function(scope) {
                    scope.clickToClose();
                });
            }
            notify.clearAll = function() {
                angular.forEach(messageArrays, function(element) {
                    element.remove();
                });
                messageArrays = [];
            };

            return notify;
        };
    });