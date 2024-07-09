import Vue from 'vue';
import Vuex from 'vuex';

// map
import mapStore from "@/store/mapStore";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        map:mapStore,
    }
})