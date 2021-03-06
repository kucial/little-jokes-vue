import Vue from 'vue'
import PortalVue from 'portal-vue'
import Toasted from 'vue-toasted'
import { Tab, Tabs } from 'vant'

import App from './App.vue'
import router from './router'
import store from './store'
import Page from './components/Page.vue'
import PageHeader from './components/PageHeader.vue'
import AutoGrowingTextarea from './components/AutoGrowingTextarea'

import Longpress from './modules/longpress'
import './registerServiceWorker'
import './style.scss'

navigator.vibrate =
  navigator.vibrate ||
  navigator.webkitVibrate ||
  navigator.mozVibrate ||
  navigator.msVibrate

Vue.use(PortalVue)
Vue.use(Toasted, {
  duration: 500,
})
Vue.use(Longpress)
Vue.use(Tab)
Vue.use(Tabs)

Vue.config.productionTip = false

Vue.component('page', Page)
Vue.component('PageHeader', PageHeader)
Vue.component('AutoGrowingTextarea', AutoGrowingTextarea)

new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
    goBack(fallback = 'home') {
      const hasHistory = window.history.length > 2 || window.location.state
      if (hasHistory) {
        this.$router.go(-1)
      } else {
        this.$router.push({
          name: fallback,
        })
      }
    },
  },
}).$mount('#app')
