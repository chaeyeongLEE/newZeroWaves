import Vue from 'vue';
import Vuex from 'vuex';

//default
import authStore from '@/store/authStore';
// map
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth: authStore,
    },
});

