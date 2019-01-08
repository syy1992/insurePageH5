import Vue from 'vue'
import VueRouter from 'vue-router'

import insure from './insure.vue'
import detail from './detail.vue'


//引入公用js
import tool from '../../assets/js/lib/tool.js'
Vue.prototype.tool=tool

import {AjaxPlugin,ToastPlugin ,AlertPlugin} from 'vux';
Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)
Vue.use(VueRouter)
Vue.use(AlertPlugin)
const routes = [
    {
        path: '/',
        name: 'detail',
        component: detail,
        meta:{
            title:'康乐一生重疾保险'
        }
    },
    {
        path: '/insure',
        name: 'applicant',
        component: insure,
        meta:{
            title:'投保页'
        }
    },
];

const router = new VueRouter({
    routes
});

router.beforeEach((to,from,next)=>{
    window.document.title=to.meta.title;
    next();
});
router.afterEach((to,form,next)=>{window.scrollTo(0,0)});
new Vue({
    el:"#app",
    router
});

