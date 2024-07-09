import Vue from 'vue';
import App from './App.vue';
import router from './routes';  // Make sure this points to your router configuration

Vue.config.productionTip = false;

//global-components
import '@/pages/index.js'

new Vue({
    render: h => h(App),
    router,
}).$mount('#app');
