import Vue from 'vue'
import App from './index.vue'
import { AjaxPlugin } from 'vux';
import { AlertPlugin } from 'vux'
import  { ToastPlugin } from 'vux'

//引入公用js
import tool from '../../assets/js/lib/tool.js'
Vue.prototype.tool=tool


Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
});