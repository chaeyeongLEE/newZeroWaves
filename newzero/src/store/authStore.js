const authStore = {
    namespaced: true,
    state: {
        userId: localStorage.getItem('userId') || '',
        userPw: localStorage.getItem('userPw') || '',
        isLoginFlag: false,
    },
    getters: {
        isLoginFlag(state) {
          return state.isLoginFlag;
        },
    },
    mutations: {
        SET_USER(state, user) {
            state.userId = user.id;
            state.userPw = user.pw;
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userPw', user.pw);
        },
        SET_LOGIN_FLAG(state, value) {
            state.isLoginFlag = value;
        },
    }
};

export default authStore;
