export default [
  {
    path: '/rank',
    component: () => import('views/rank')
  },
  {
    path: '/rank/:id',
    component: () => import('views/rank/Detail')
  }
]
