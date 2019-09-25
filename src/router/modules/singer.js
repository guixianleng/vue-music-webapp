export default [
  {
    path: '/singer',
    component: () => import('views/singer')
  },
  {
    path: '/singer/:id',
    component: () => import('views/singer/Detail')
  }
]
