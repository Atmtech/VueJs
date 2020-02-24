import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Accueil",
    component: () => import("../views/Accueil.vue")
  },
  {
    path: "/Admin",
    name: "Admin",
    component: () => import("../views/Admin.vue")
  }
];

const router = new VueRouter({ mode: "history", routes });

export default router;
