import Vue from 'vue'
import Router from 'vue-router'
import Onecar from '@/components/Onecar.vue'
import Contrastcar from '@/components/Contrastcar.vue'
import Twocar from '@/components/Twocar.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'onecar',
      component: Onecar
    },
    {
      path: '/onecar',
      component: Onecar
    },
    {
      path: '/duibi',
      name: 'duibi',
      component: Contrastcar
    },
    {
      path: '/twocar',
      name: 'Twocar',
      component: Twocar
    },
    {
      path:"*",
      redirect:"/"
    }
  ]
})
