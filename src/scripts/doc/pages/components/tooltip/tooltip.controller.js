class Controller {
    constructor($sce) {
        "ngInject";
        
        this.click = "click";
        this.htmlTooltip = $sce.trustAsHtml('<em>我是斜体</em>, <b ui-tooltip="提示信息">我是粗体</b>');
    }
}

export default Controller;