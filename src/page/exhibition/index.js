import Vue from 'vue'
import App from './index.vue'

import { ToastPlugin } from 'vux';
Vue.use(ToastPlugin)

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})