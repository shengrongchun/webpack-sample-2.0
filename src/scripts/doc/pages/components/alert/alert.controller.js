class Controller {
    constructor(uiAlert) {
        "ngInject";
        
        this.uiAlert = uiAlert;
    }

    alertConfirm() {
        this.uiAlert.confirm('确定操作吗?', {
            backdrop: 'static'
        }).then(() => {
            this.alertConfirmText = '已确定';
        }).catch(() => {
            this.alertConfirmText = '已取消';
        });
    }

    alertInfo() {
        this.uiAlert.info('操作已完成');
    }

    alertSuccess() {
        this.uiAlert.success('操作成功！');
    }

    alertWarning() {
        this.uiAlert.warning('此操作不可恢复，确定吗?').then(() => {
            this.alertWarningText = '已确定';
        }).catch(() => {
            this.alertWarningText = '已取消';
        });
    }

    alertError() {
        this.uiAlert.error('操作失败！');
    }

    alertPrompt() {
        this.uiAlert.prompt('您的姓名?').then((name) => {
            this.alertPromptText = '您的姓名:' + name;
        });
    }
}

export default Controller;