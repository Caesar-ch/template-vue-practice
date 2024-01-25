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
  },
  {
    path: '/key',
    name: 'key',
    component: () => import(/* webpackChunkName: "KeyImportant" */ '../views/KeyImportant/KeyImportant.vue'),
  },
  {
    path: '/theme',
    name: 'theme',
    component: () => import(/* webpackChunkName: "ThemeToggle" */ '../views/ThemeToggle/ThemeToggle.vue'),
  },
  {
    path: '/vuedrag',
    name: 'vuedrag',
    component: () => import(/* webpackChunkName: "ThemeToggle" */ '../views/Vuedraggable/Vuedraggable.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
