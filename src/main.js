import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design';

// import style
import 'view-design/dist/styles/iview.css';

import store from './store'
import './theme/index.less'


Vue.use(ViewUI)



Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')