import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        authed: false,
        userInfo: {},
        openId: '',
        login: false,
        token: '',
        isIphoneX: false,
        bookingSuccessTips: ''
    },
    mutations: {
        loginWx(state, provider) {
            // state.openId = provider.openId;
            state.userInfo = provider;
        },
        updateIsIphoneX(state, el) {
            state.isIphoneX = el;
        },
        updateOpenId(state, el) {
            state.openId = el;
        },
        authed(state, el) {
            state.authed = el
        },
        setBookingSuccessTips(state, payload) {
            state.bookingSuccessTips = payload
        }
    }
})
export default store