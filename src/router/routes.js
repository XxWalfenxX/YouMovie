const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "/", redirect: "/login" },
      { path: "login", component: () => import("src/pages/LoginPage.vue") },
      {
        path: "register",
        component: () => import("src/pages/RegisterPage.vue"),
      },
    ],
    meta: { auth: false },
  },
  {
    path: "/app",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/ver-online/:id",
        name: "PeliculaView",
        component: () => import("pages/Pelicula.vue"),
      },
      {
        path: "/pelicula/:id",
        name: "DescipcionPelicula",
        component: () => import("pages/DescipcionPelicula.vue"),
      },
      { path: "/mi-cuenta", component: () => import("pages/MiCuenta.vue") },
      { path: "/admin", component: () => import("pages/AdminPanel.vue") },
      { path: "/mi-lista", component: () => import("pages/MiLista.vue") },
      { path: "/buscar", component: () => import("pages/BuscarPeli.vue") },
    ],
    meta: { auth: true },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
