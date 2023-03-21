const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/ver-online", component: () => import("pages/Pelicula.vue") },
      { path: '/pelicula/:id', name: 'DescipcionPelicula', component:() => import("pages/DescipcionPelicula.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*", name: "ErrorNotFound",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
