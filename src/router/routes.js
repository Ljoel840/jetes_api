
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/generarguia',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/GenerarGuia.vue') }
    ]
  },
  {
    path: '/generarpdf',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/GenerarPDF.vue') }
    ]
  },
  {
    path: '/tarifa',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CalcularTarifa.vue') }
    ]
  },
  {
    path: '/tracking',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Tracking.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
