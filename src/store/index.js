import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        login: false,
        token: '',
        avatar: '',
        nickName: '',
        isIphoneX: false,
        openId: ''
    },
    mutations: {
        login(state, provider) {
            console.log(provider)
            state.token = provider.token;
            state.nickName = provider.nickName;
            state.openId = provider.openId;
            state.avatar = provider.avatar;
        },
        updateIsIphoneX(state, el) {
            state.isIphoneX = el;
        },
    }
})
export default store