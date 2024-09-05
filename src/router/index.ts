import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import ConvertPage from '@/pages/ConvertPage.vue'
import MainPage from '@/pages/MainPage.vue'
import PageNotFound from '@/pages/PageNotFound.vue'
import { COMMON_ROUTES } from '@/router/constants/CommonRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(
    [
      { path: COMMON_ROUTES.main, component: MainPage },
      { path: COMMON_ROUTES.convert, component: ConvertPage },
      { path: '/:pathMatch(.*)*', component: PageNotFound },
    ]),
})

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
