import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './plugins'
import './style'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
