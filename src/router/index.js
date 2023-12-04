import { createRouter, createWebHistory } from 'vue-router'
import DragTable from '../views/DragTable/DragTable.vue'

const routes = [
  {
    path: '/',
    name: 'DragTable',
    component: DragTable
  },
  {
    path: '/compare',
    name: 'compare',
    component: () => import(/* webpackChunkName: "RefAndReactive" */ '../views/RefAndReactive/RefAndReactive.vue'),
  },
  {
    path: '/adapt',
    name: 'adapt',
    component: () => import(/* webpackChunkName: "MobileAdaptation" */ '../views/MobileAdaptation/MobileAdaptation.vue'),
  },
  {
    path: '/grid',
    name: 'grid',
    component: () => import(/* webpackChunkName: "GridLayout" */ '../views/GridLayout/GridLayout.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
