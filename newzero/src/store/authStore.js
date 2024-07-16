import axios from "axios";

const authStore = {
    namespaced: true,
    state: {
        userId: localStorage.getItem('userId') || '',
        userPw: localStorage.getItem('userPw') || '',
        isLoginFlag: !!localStorage.getItem('userId'),
        userPlaceList: [],
        clickPlace: {},
        newUser: {
            id: '',
            pw: '',
            email: '',
            phone: '',
        },
        modal: {
            favoriteModal: false,
        }
    },
    getters: {
        isLoginFlag(state) {
          return state.isLoginFlag;
        },
    },
    mutations: {
        SET_MODAL(state, modalName) {
          state.modal[modalName] = !state.modal[modalName];
            console.log('SET_MODAL', state.modal[modalName]);
        },
        NEW_USER(state, data) {
            state.newUser[data.name] = data.value;
        },
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
        RESET_DATA(state) {
            state.newUser = {}
        },
        RESET_CLICK_DATA(state) {
            state.clickPlace = {}
        },
        CLICK_DATA(state, data)  {
            state.clickPlace= data;
            console.log('누른얘:', data)
        }
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
        async GET_JOIN_USER({ commit }, userInfo){
            try {
                const { data } = await axios.post("http://localhost:3001/users", {
                    id: userInfo.id,
                    pw: userInfo.pw,
                    email: userInfo.email,
                    name: userInfo.name,
                });
                switch (true) {
                    case data.status === '0000':
                        commit('NEW_USER', data.output);
                        alert('회원가입이 완료되었습니다.')
                        break;
                    default:
                        alert('회원가입에 실패하였습니다.');
                        break;
                }
            } catch (e) {
                alert('회원가입에 실패하였습니다.');
                console.log(e);
            }
        },
        async ADD_USER_PLACE({ state, commit }){
            try {
                const { data } = await axios.post("http://localhost:3001/totalPlace", {
                    place: state.clickPlace.place.place_name,
                    address:state.clickPlace.place.address_name,
                    phone: state.clickPlace.place.phone || '',
                    desc:''
                });
                switch (true) {
                    case data.status === '0000':
                        commit('SET_USER_PLACE', data.output);
                        alert('장소 저장이 완료되었습니다.');
                        break;
                    default:
                        alert('장소 저장에 실패하였습니다.');
                        break;
                }
            } catch (e) {
                alert('장소 저장에 실패하였습니다.');
                console.log(e);
            }
        },

    },
};

export default authStore;
