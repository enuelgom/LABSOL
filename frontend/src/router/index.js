import Vue from 'vue';
import VueRouter from 'vue-router';
import { isAuth, isStudent } from "../auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/proyectos',
    name: 'ListaLaboratorios',
    component: () => import('../views/ListaLaboratorios.vue')
  },
  {
    path: '/proyectos/Perfil',
    name: 'Perfil',
    component: () => import('../views/Alumnos/Perfil.vue'),
    meta: {
      requiresAuth: true,
      requireStudent: true
    }
  },
  {
    path: '/proyectos/laboratorio/:nameLab',
    name: 'ProyectosLaboratorios',
    component: () => import('../views/ProyectosLaboratorios.vue')
  },
  {
    path: '*',
    redirect: '/proyectos'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
	to.matched.some(route => {
    // Requiere autenticacion de cualquier usuario
    try {
      if (route.meta.requiresAuth) {
        if (isAuth()) {
          next({ path: "/proyectos" });
        }
      }
      
      // Requiere autenticacion de estudiante
      if (route.meta.requireStudent) {
        if (!isStudent()) {
          next({ name: "ListaLaboratorios" });
        }
      }
    } catch (error) {
      
    }
		next();
	});
});

export default router;
