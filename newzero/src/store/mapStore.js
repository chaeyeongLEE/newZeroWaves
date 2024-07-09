const DATA = () => {
    return {
        isLogin: true,
        shopList: [],
        favoriteList: [],
        modal: {
            favoriteModal: false,
        }
    };
};

const mapStore = {
    namespaced: true,
    state:DATA(),
    getters: {},
    mutations: {},
    actions: {},
};
export default mapStore;