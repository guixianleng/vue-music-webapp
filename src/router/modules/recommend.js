export default [
  {
    path: '/recommend',
    component: () => import('views/recommend')
  },
  // 详情
  {
    path: '/recommend/:id',
    component: () => import('views/recommend/Detail')
  }
]
