export default [
  {
    path: '/about/',
    component: require('./pages/About.vue')
  },
  {
    path: '/form/',
    component: require('./pages/Form.vue')
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: require('./pages/Dynamic.vue')
  },
  {
    path: '/login/',
    component: require('./pages/Login.vue')
  },
  {
    path: '/index/',
    component: require('./pages/Main.vue')
  }
]
