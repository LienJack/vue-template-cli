import Vue from 'vue'
import App from './App'
import router from './router'
<% if (vux) { %>import store from './store' <% } %>
import './plugins'
import './style'

new Vue({
  router,
	<% if (vux) { %> store, <% } %>
	render: h => h(App)
}).$mount('#app')
