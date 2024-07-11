import Vue from 'vue';
import App from './App.vue';
import router from '@/routes';
import store from './store/index'
// import store from "@/store/index";

Vue.config.productionTip = false;

//global-components
import '@/pages/index.js'

new Vue({
    render: h => h(App),
    store,
    router,
}).$mount('#app');
