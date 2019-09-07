import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$serverUrl = 'http://112.125.25.43:9090';
Vue.prototype.$store = store;
App.mpType = 'app';

const app = new Vue({
    ...App
})
app.$mount();