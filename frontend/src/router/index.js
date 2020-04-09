import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/proyectos-labsol/frontend/dist',
    name: 'ListaLaboratorios',
    component: () => import('../views/ListaLaboratorios.vue')
  },
  {
    path: '/proyectos-labsol/frontend/dist/Perfil',
    name: 'Perfil',
    component: () => import('../views/Alumnos/Perfil.vue')
  },
  {
    path: '/proyectos-labsol/frontend/dist/laboratorio/:nameLab',
    name: 'ProyectosLaboratorios',
    component: () => import('../views/ProyectosLaboratorios.vue')
  },
  {
    path: '*',
    redirect: '/proyectos-labsol/frontend/dist'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
