import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from "@/pages/LoginPage.vue";
import MainPage from "@/pages/MainPage.vue";
// import MapPage from "@/pages/MapPage.vue";
import MyPage from "@/pages/MyPage.vue";
import JoinPage from "@/pages/JoinPage.vue";
import MapImsiPage from "@/pages/MapImsiPage.vue";

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
            // {
            //     path: '/map',
            //     component: MapPage,
            // },
            {
                path: '/map',
                component: MapImsiPage,
            },
            {
                path: '/Login',
                component: LoginPage,
            },
            {
                path: '/MyPage',
                component: MyPage
            },
            {
                path: '/Join',
                component: JoinPage
            }
        ]
    },
];

export default new Router({
    mode: 'history',
    routes,
});
