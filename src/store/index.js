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
        bookingSuccessTips: '',
        publicKey: '', // RSA 加密KEY
        hitRate: 5, // 命中能量值概率
        gainRate: 5, // 暴击概率
        scoreList: [1, 2, 3], // 随机分值表
        rateConfig: {}
    },
    mutations: {
        setUserInfo(state, provider) {
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
        },
        setPublicKey(state, el) {
            state.publicKey = el
        },
        setHitRate(state, el) {
            state.hitRate = el
        },
        setGainRate(state, el) {
            state.gainRate = el
        },
        setScoreList(state, el) {
            state.scoreList = el
        },
        setRateConfig(state, el) {
            state.rateConfig = el
        }
    }
})
export default store