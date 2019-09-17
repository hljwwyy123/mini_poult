import Vue from 'vue'
import App from './App'
import store from './store'
import { request, toast } from './utils/index'

Vue.config.productionTip = false

Vue.prototype.$serverUrl = 'https://poult.mttsmart.com';
Vue.prototype.$store = store;
Vue.prototype.$request = request;
Vue.prototype.$toast = toast;
App.mpType = 'app';

const app = new Vue({
    ...App
})
app.$mount();