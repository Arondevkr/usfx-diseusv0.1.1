import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/index";
// import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { getTokenFromLocalStorage } from "@/helpers";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // { path: "/", name: "home", component: HomeView },
    { path: "/login", name: "login", component: LoginView },

    // {
    //   path: "/usuarios",
    //   name: "usuarios",
    //   component: () => import("../views/UsuariosView.vue"),
    //   children: [
    //     {
    //       path: "",
    //       component: () => import("../components/paginas/Usuarios.vue"),
    //     },
    //   ],
    // },

    {
      path: "/estudiante",
      name: "estudiante",
      component: () => import("../views/EstudianteView.vue"),
      children: [
        {
          path: "",
          component: () => import("../components/pages/estudiante.vue"),
        },
      ],
    },
    
    {
      path: "/carrera",
      name: "carrera",
      component: () => import("../views/CarreraView.vue"),
      children: [
        {
          path: "",
          component: () => import("../components/pages/carrera.vue"),
        },
      ],
    },
    {
      path: "/facultad",
      name: "facultad",
      component: () => import("../views/FacultadView.vue"),
      children: [
        {
          path: "",
          component: () => import("../components/pages/facultad.vue"),
        },
      ],
    },

    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      children: [
        {
          path: "",
          component: () => import("../components/pages/dashboard.vue"),
        },
      ],
    },
    

  ],
});

router.beforeEach(async (to) => {
  const publicPages = ["/login"];
  // const publicPages = ["/"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !getTokenFromLocalStorage()) {
    if (authStore) authStore.logout();
    authStore.returnUrl = to.fullPath;
    return "/login";
    // return "/estudiante";
  }
});

export default router;
