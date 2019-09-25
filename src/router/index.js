import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [
  {
    path: '/',
    redirect: '/recommend'
  }
]

// 模块自动化导入
// 参考 https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C
const routerContext = require.context('./modules', true, /\.js$/)
routerContext.keys().forEach(route => {
  const routerModule = routerContext(route)
  routes = [...routes, ...(routerModule.default || routerModule)]
})

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: routes
})
