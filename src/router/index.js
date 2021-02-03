import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);
// 路由器
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: ()=>import(/* webpackChunkName: "page" */ "../components/DesignPage.vue")
        },
        {
            path: '/preview',
            name: 'preview',
            component:()=>import(/* webpackChunkName: "page" */ "../components/Preview.vue")
        }
    ]
  });

export default router