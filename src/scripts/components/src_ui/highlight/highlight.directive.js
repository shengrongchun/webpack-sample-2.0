class Directive {
    constructor() {
        "ngInject";
        return {
            restrict: 'A',
            scope: {
                lineNum: '='
            },
            link: this.link
        };
    }
    link(scope, element, attrs, transclude) {
        if(element[0].parentElement.parentElement.nodeName == "CODE"){
            return;
        }
        element[0].innerHTML = element[0].innerHTML.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/        /g,"");
        let str = element[0].innerHTML;
        if(scope.lineNum == undefined || scope.lineNum) {
            let domArrays = element[0].innerHTML.split('\n');
            str = '';
            let i = 1;
            angular.forEach(domArrays,(obj)=> {
                if(obj == '') {return;}
                str = str+'<span class="num">'+i+++'</span>'+'<span class="content">'+obj+'</span>'+'\n';
            });
        }
        element[0].innerHTML = '<div class="highlight">'+str+'</div>';
        hljs.highlightBlock(element[0]);
    }
    static factory() {
        return new Directive();
    }
}

export default Directive;


// var $this = angular.element(element[0]);
        // var watch = scope.$watch(()=>{return [scope.code,scope.theme,scope.language]},()=>{
        //    var highLightCode = wangHighLighter.highLight(scope.language,scope.theme,scope.code); //格式化代码 
        //     $this.html(highLightCode) 
        //     //watch();//移除watch
        // },true);