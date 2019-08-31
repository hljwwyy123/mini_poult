import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        mdd_id: '',                 // 千万不要给默认值，根据ip 获取mddid的时候判断了vuex里的mddid 是不是空
        mdd_name: '',
        default_location: '',       // 首页默认定位参数（switchTab 不能带参数，必须借助storage | vuex ）
        location: {
            lng: 0,                     // 经度
            lat: 0,                     // 维度
        },
        windowIneerHeight: 0,
        windowIneerWidth: 0,
        autoFocusIndex: false,      // 首页自动选中 tab_bar
        mfwUserId: 0,
        hasBindTel: false,          // 当前mfw账号是否绑定了手机号
        openId: 0,
        sid: 0,
        qrcodeParam:{               // 扫码中间页参数
            sid : 0,
            sceneId: 0,
            salesId: 0,
            p_id: 0, // 兼职人员唯一标志
        },
        is_distribution: 1,         // 门票地推
        is_sanyaDistributor: 0,     // 三亚分销
        is_ota: -1,                 // -1:未登录，0：不是分销商，1：是分销商
        couponRedPoint: false,      //优惠券红点
        mfwUserName: '',
        mfwUserLogo: '',
        model: '',
        isIphoneX: false,
        webviewCallBackUrl: '',     // web-view 回跳URL，产品详情页选择库存 ——> native login -> 产品详情页 && 库存锚点
        webviewSrc: '',             // webview 公用一个组件，src 放到vuex 解决 onshow的bug
        dpr: 2,                     // 画canvas 的时候用
        bookingUrl: '',             // login back goto booking page
        appLoadModel: 0,            //直接打开，扫描小程序码，扫描普通二维码，分享
        showAppEntrance: false,
        showHomePageAppDialog:false, //首页展示下载APP 红包弹窗
        wengSource: 'ticket',        // 电商小程序 笔记source 固定为ticket
        publishWengInfo: {                  // 发布笔记信息 poi_id,mdd_id ,lng,lat
            "poi_id": 0,
            "poi_name": "",
            "mdd_id": 0,
            "lng": 0,
            "lat": 0,
            "isCustomizeMdd": false
        },
        showActivityIcon: false, //活动浮标

    },
    getters:{
        mdd_id: state => {
            return state.mdd_id
        },
        mdd_name: state => {
            return state.mdd_name
        }
    },
    mutations: {
        updateLocation(state,el){
            state.location = el;
        },
        updateDefault_location(state,el){
            state.default_location = el
        },
        updateMddName(state,el){
            state.mdd_name = el
        },
        updateMddId(state,el){
            state.mdd_id = el
        },
        updateAutoFocusIndex(state,el){
            state.autoFocusIndex = el;
        },
        updateWindowIneerHeight(state, el) {
            state.windowIneerHeight = el
        },
        updateWindowWidth(state, el) {
            state.windowIneerWidth = el
        },
        updateMfwUserName(state, el) {
            state.mfwUserName = el;
        },
        updateMfwUserId(state, el) {
            state.mfwUserId = el;
        },
        updateHasBindTel(state,el){
            state.hasBindTel = el
        },
        updateIsDistribution(state, el) {
            state.is_distribution = el
        },
        updateSanYaDistributor(state,el){
            state.is_sanyaDistributor = el
        },
        updateCouponRedPoint(state,el){
            state.couponRedPoint = el
        },
        updateMfwUserLogo(state, el) {
            state.mfwUserLogo = el;
        },
        updateWebviewCallBackUrl(state, el){
            state.webviewCallBackUrl = el;
        },
        updateWebviewSrc(state,el){
            state.webviewSrc = el
        },
        updateOpenId(state, el) {
            state.openId = el;
        },
        updateSid(state, el) {
            state.sid = el;
        },
        updateQrcodeSid(state, el){
            state.qrcodeSid = el
        },
        updateQrcodeSceneId(state, el){
            state.qrcodeSceneId = el
        },
        updateQrcodeSalesId(state, el){
            state.qrcodeSalesId = el;
        },
        updateOta(state,el){
            state.is_ota = el
        },
        updateDPR(state,el){
            state.dpr = el
        },
        updateModel(state,el){
            state.model = el;
            state.isIphoneX = el.indexOf('iPhone X') > -1;
        },
        updateBookingUrl(state,el){
            state.bookingUrl = el;
        },
        updateAppLoadModel(state,el){
            state.appLoadModel = el
        },
        updateShowAppEntrance(state,el){
            state.showAppEntrance = el
        },
        updateShowHomePageAppDialog(state,el){
            state.showHomePageAppDialog = el
        },
        updatePublishWengInfo(state, obj){
            state.publishWengInfo[obj.key] = obj.value;
        },
        updateQrcodeParam(state, obj){
            state.qrcodeParam[obj.key] = obj.value;
        },
        updateShowActivityIcon(state,el){
            state.showActivityIcon = el
        },

    }
})
