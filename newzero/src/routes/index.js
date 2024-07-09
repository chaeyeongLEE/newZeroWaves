import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from "@/pages/LoginPage.vue";
import MainPage from "@/pages/MainPage.vue";
import MapPage from "@/pages/MapPage.vue";
import MyPage from "@/pages/MyPage.vue";

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/home',
        component: ()=> import('@/pages/index.vue'),
        children: [
            {
                path: '/home',
                component: MainPage,
            },
            {
                path: '/map',
                component: MapPage,
            },
            {
                path: '/login',
                component: LoginPage,
            },
            {
                path: '/myPage',
                component: MyPage
            }
        ]
    },
];

export default new Router({
    mode: 'history',
    routes,
});
