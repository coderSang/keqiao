import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
import store from "./store";
const app = new Vue({
  store,
  ...App
})
app.$mount()
