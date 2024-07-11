const authStore = {
    namespaced: true,
    state: {
        userId: localStorage.getItem('userId') || '',
        userPw: localStorage.getItem('userPw') || '',
    },
    getters: {
        isLogin(state) {
            return state.userId !== '';
        }
    },
    mutations: {
        SET_USER(state, user) {
            state.userId = user.id;
            state.userPw = user.pw;
            // localStorage.setItem('userId', user.id);
            // localStorage.setItem('userPw', user.pw);
            console.log('aaa')
        },
    }
};

export default authStore;
