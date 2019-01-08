import Vue from 'vue'
import App from './index.vue'

import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})