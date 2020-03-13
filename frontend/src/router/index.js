import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ListaLaboratorios',
    component: () => import('../views/ListaLaboratorios.vue')
  },
  {
    path: '/Perfil',
    name: 'Perfil',
    component: () => import('../views/Alumnos/Perfil.vue')
  },
  {
    path: '/laboratorio/:nameLab',
    name: 'ProyectosLaboratorios',
    component: () => import('../views/ProyectosLaboratorios.vue')
  },
  {
    path: '*',
    redirect: '/  '
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
