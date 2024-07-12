import axios from "axios";

const authStore = {
    namespaced: true,
    state: {
        userId: localStorage.getItem('userId') || '',
        userPw: localStorage.getItem('userPw') || '',
        isLoginFlag: !!localStorage.getItem('userId'),
        userPlaceList: [],
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
            state.isLoginFlag = true;
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userPw', user.pw);
        },
        SET_LOGIN_FLAG(state, value) {
            state.isLoginFlag = value;
        },
        SET_USER_LOGOUT(state) {
            state.userId = '';
            state.userPw = '';
            state.isLoginFlag = false;
            localStorage.removeItem('userId');
            localStorage.removeItem('userPw');
        },
        SET_USER_PLACE(state, output) {
            state.userPlaceList = output;
        },
    },
    actions: {
        async GET_USER_PLACE({ commit }){
            try {
                const { data } = await axios.get("http://localhost:3001/totalPlace");
                switch (true) {
                    case data.status === '0000':
                        commit('SET_USER_PLACE', data.output);
                        break;
                    default:
                        alert('리스트를 불러오는데 실패하였습니다.');
                        break;
                }
            } catch (e) {
                alert('리스트를 불러오는데 실패하였습니다.');
                console.log(e);
            }
        },
    },
};

export default authStore;
