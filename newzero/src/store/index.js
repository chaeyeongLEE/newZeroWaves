import Vue from 'vue';
import Vuex from 'vuex';
import authStore from '@/store/authStore';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth: authStore
    }
});
