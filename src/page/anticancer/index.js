import Vue from 'vue'
import VueRouter from 'vue-router'

import insure from './insure.vue'
import detail from './detail.vue'
import getval from './getValue.vue'

import { AjaxPlugin,AlertPlugin,ToastPlugin } from 'vux';
// import { AlertPlugin } from 'vux'
// import  { ToastPlugin } from 'vux'
Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(VueRouter)
Vue.use(ToastPlugin)

//引入公用js
import tool from '../../assets/js/lib/tool.js'
Vue.prototype.tool=tool

const routes = [
    {
        path: '/',
        name: 'detail',
        component: detail,
        meta: {
            title: '安心防癌'
        }
    },
        {
            path: '/insure',
            name: 'insure',
            component: insure,
            meta: {
                title: '投保'
            }
        },
        {
            path: '/getValue',
            name: 'getVal',
            component: getval,
            meta: {
                title: '支付'
            }
        }
    ];

const router = new VueRouter({
    routes
});

// new Vue({
//     el: '#app',
//     template: '<App/>',
//     router,
//     components: { App }
// })

router.beforeEach((to,from,next)=>{
    window.document.title=to.meta.title;
    next();
});
router.afterEach((to,form,next)=>{window.scrollTo(0,0)});
new Vue({
    el:"#app",
    router
});
