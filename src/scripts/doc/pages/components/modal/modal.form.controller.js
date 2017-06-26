class modalController {

    constructor($uiModalInstance, items) {
        "ngInject";

        this.$uiModalInstance = $uiModalInstance;

        this.items = items;

    }

    ok() {
        this.$uiModalInstance.close(this.selected.item);
    }

    cancel() {
        this.$uiModalInstance.dismiss('cancel');
    }

}
export default modalController;