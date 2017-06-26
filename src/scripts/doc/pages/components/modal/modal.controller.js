import templateUrl from './modal.form.view.html';
import modalController from './modal.form.controller';

class Controller {
    constructor($uiModal) {
        "ngInject";

        this.items = ['item1','item2','item3'];
        var $ctrl = this;

        this.open = function (size) {

            var modalInstance = $uiModal.open({

                //animation: true, //是否动画,默认是
                //appendTo: 'body', //将模态追加到特定元素，默认为body
                //backdrop: true, //是否显示模态框的背景色，默认是true,如果是static，禁止点击背景色关闭模态框
                //backdropClass: 'xxx', //给背景加上class,定制自己的背景
                //component: 'modalComponent', //显示自己定义的一个组件，感觉和指令没啥太大区别
                //keyboard: true, //按esc键是否可以关闭modal，默认是true
                //openClass: 'modal-open', // 模态框打开时，在body上添加的class，默认是modal-open
                //scope: {}, //定义自己的scope,默认是$rootscope
                //template: '<div></div>', //模态框内容模板
                //windowClass: 'x', //给模态框加class
                //windowTemplateUrl: //模态框模板
                //windowTopClass: 'xx', //给模态框顶部类加class

                size: size, //modal尺寸
                controller: modalController, //模态框控制器
                controllerAs: 'vm', //控制器别名
                templateUrl: templateUrl, //模态框内容模板路径


                resolve: { //向控制器传值
                    items: function () {
                      return $ctrl.items;
                    }
                }



            });

            modalInstance.result.then(function (selectedItem) {
               console.log(selectedItem);
            }, function () {
               console.log("取消");
            });

        };

    }

}
export default Controller;