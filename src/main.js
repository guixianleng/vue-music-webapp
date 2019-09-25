import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload' // 懒加载图片插件

import './assets/style/index.less'

Vue.config.productionTip = false

// 解决移动端点击300毫秒延迟
fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('assets/images/default.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
