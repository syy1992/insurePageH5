import Vue from 'vue'
import VueRouter from 'vue-router'

import insure from './insure.vue'
import detail from './detail.vue'

import {AjaxPlugin,ToastPlugin } from 'vux';
Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'detail',
        component: detail,
        meta:{
            title:'昆仑燃气险企业版'
        }
    },
    {
        path: '/insure',
        name: 'applicant',
        component: insure,
        meta:{
            title:'投保'
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

