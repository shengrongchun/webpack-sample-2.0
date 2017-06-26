/**
 * @author: shengrongchun
 */

import style from './tabs.scss';

class Controller {
    constructor($rootScope) {
        "ngInject";

        // 默认选中的tab id
        this.activeId = 'about';

        // 选项卡列表
        this.tabList = [{
            'id': 'home',
            'heading': '首页',
            'content': 'Volutpat montes per est. Sociosqu orci pharetra. Eros fermentum cursus. Orci cras justo aliquet tristique. Sed. Leo erat morbi, quam rutrum.'
        }, {
            'id': 'help',
            'heading': '帮助信息',
            'content': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        }, {
            'id': 'about',
            'heading': '关于我们',
            'content': 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.'
        }, {
            'id': 'home',
            'heading': '演示文档',
            'content': 'Volutpat montes per est. Sociosqu orci pharetra. Eros fermentum cursus. Orci cras justo aliquet tristique. Sed. Leo erat morbi, quam rutrum.'
        }, {
            'id': 'help',
            'heading': '相关资源',
            'content': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        }, {
            'id': 'help',
            'heading': '监控中心',
            'content': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        }];

        // 插入新的选项卡
        this.insertTab = function() {
            this.tabList.push({
                'id': 'info',
                'heading': '资源配置',
                'content': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                'active': true
            });
        };

        // 删除选项卡
        this.removeTab = function(tab) {
            var index = this.tabList.indexOf(tab);
            this.tabList.splice(index, 1);
        };

        // 当选中选项卡触发回调函数
        this.selectTab = function(tab) {
            console.log('打开选项卡:' + tab.heading);
        };

        // 当取消选中选项卡触发回调函数
        this.deselectTab = function(tab) {
            console.log('取消选中选项卡:' + tab.heading);
        };





    }


    
}

export default Controller;
