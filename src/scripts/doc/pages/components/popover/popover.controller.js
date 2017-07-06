class Controller {
    constructor($sce) {
        "ngInject";
        
        this.htmlPopover = $sce.trustAsHtml('<em>我是斜体</em>, <b>我是粗体</b>');
    }
}

export default Controller;