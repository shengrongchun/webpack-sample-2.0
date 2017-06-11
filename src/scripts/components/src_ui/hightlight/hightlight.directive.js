class Directive {
    constructor() {
        "ngInject";
        return {
            restrict: 'E',
            scope: {
                language: '=',
                theme: '=',
                code: '='
            },
            replace: true,
            transclude: true,
            template: '<div ng-transclude></div>',
            link: this.link.bind(this),
        };
    }
    link(scope, element, attrs) {
        
        if(element[0].innerHTML != '') {
            element[0].innerHTML = element[0].innerHTML.replace(/\/n/g,'\n');
            scope.code = element[0].innerHTML;
        }
        var $this = angular.element(element[0]);
        var watch = scope.$watch(()=>{return [scope.code,scope.theme,scope.language]},()=>{
           var highLightCode = wangHighLighter.highLight(scope.language,scope.theme,scope.code); //格式化代码 
            $this.html(highLightCode) 
            //watch();//移除watch
        },true);
    }
    static factory() {
        return new Directive();
    }
}

export default Directive;