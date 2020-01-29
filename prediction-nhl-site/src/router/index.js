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
    path: "/Login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/TableauBord",
    name: "TableauBord",
    component: () => import("../views/TableauBord.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
