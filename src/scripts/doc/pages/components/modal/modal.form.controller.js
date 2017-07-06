class modalController {

    constructor($uiModalInstance, items) {
        "ngInject";

        this.$uiModalInstance = $uiModalInstance;

        this.items = items;

        this.selected = {};

    }

    ok() {
        this.$uiModalInstance.close(this.selected.item?this.selected.item:null);
    }

    cancel() {
        this.$uiModalInstance.dismiss('cancel');
    }

}
export default modalController;